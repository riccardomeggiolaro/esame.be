/* eslint-disable prettier/prettier */
import { Model } from "mongoose";
import { RequetsAbstractService } from "./requests.abstract.service";
import { InjectModel } from "@nestjs/mongoose";
import { Request } from "../entity/requests.schema";
import { FiltersRequestDTO, RangeRequestDTO, RequestDTO, SetRequestDTO } from "../entity/request.dto";
import { isNil, omitBy } from "lodash";

export class RequestService extends RequetsAbstractService {
    constructor(@InjectModel(Request.name) private requestSchema: Model<Request>) {
        super();
    }

    async get(id: string): Promise<Request> {
        return await this.requestSchema.findById(id);
    }

    async list(filters: FiltersRequestDTO): Promise<Request[]> {
        let range = {}
        if (filters.dateMin) range["$gte"] = filters.dateMin;
        if (filters.dateMin) range["$lte"] = filters.dateMax;
        if (!filters.dateMin && !filters.dateMax) range = null;
        let surnameName = {
            $and: []
        }
        if (filters.surname) surnameName.$and.push({surname: RegExp(filters.surname)});
        if (filters.name) surnameName.$and.push({name: RegExp(filters.name)});
        else if (!filters.surname && !filters.name) surnameName = null;
        const q = {
            ...surnameName,
            date: range,
            amount: filters.amount, 
            numberRate: filters.numberRate
        }
        const q_filters = omitBy(q, isNil);
        const asc: {date: null | undefined | string} = {
            date: null
        };
        if (filters.ascDate == true) asc.date = 'asc';
        else if (filters.ascDate == false) asc.date = 'desc';
        const ascDate = omitBy(asc, isNil);
        return await this.requestSchema.find(q_filters).limit(filters.limit).sort(ascDate);
    }

    async add(request: RequestDTO): Promise<Request> {
        return await this.requestSchema.create(request);
    }

    async set(id: string, setRequest: SetRequestDTO): Promise<Request> {
        return await this.requestSchema.findByIdAndUpdate(id, setRequest, {new: true});
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await this.requestSchema.findByIdAndDelete(id);
        return deleted ? true : false;
    }

    async totalAmount(filters: RangeRequestDTO): Promise<number> {
        let dateFilter = {};
        if (filters.dateMin || filters.dateMax) {
            dateFilter = {
                date: {
                    ...(filters.dateMin && { $gte: new Date(filters.dateMin) }),
                    ...(filters.dateMax && { $lte: new Date(filters.dateMax) })
                }
            };
        }
        const pipeline = [
            {
                $match: dateFilter
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ];
        const result = await this.requestSchema.aggregate(pipeline)
        if (result.length > 0) return result[0].totalAmount;
        return 0;
    }

    async averageRate(filters: RangeRequestDTO): Promise<number> {
        let dateFilter = {};
        if (filters.dateMin || filters.dateMax) {
            dateFilter = {
                date: {
                    ...(filters.dateMin && { $gte: new Date(filters.dateMin) }),
                    ...(filters.dateMax && { $lte: new Date(filters.dateMax) })
                }
            };
        }
        const pipeline = [
            {
                $match: dateFilter
            },
            {
                $group: {
                    _id: null,
                    averageRate: { $avg: '$numberRate' }
                }
            }
        ]
        const result = await this.requestSchema.aggregate(pipeline);
        if (result.length > 0) return result[0].averageRate;
        return 0;
    }
}