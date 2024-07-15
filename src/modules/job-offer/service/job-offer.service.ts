/* eslint-disable prettier/prettier */
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { JobOfferAbstractService } from "./job-offer.abstract.service";
import { JobOffer } from "../entity/job-offer.schema";
import { JobOfferDTO, SetJobOfferDTO, FiltersJobOfferDTO } from "../entity/job-offer.dto";

export class JobOfferService extends JobOfferAbstractService {
    constructor(@InjectModel(JobOffer.name) private jobOfferSchema: Model<JobOffer>) {
        super();
    }

    async list(filters: FiltersJobOfferDTO): Promise<JobOffer[]> {
        let text: object = {
            $or: []
        }
        if (filters.text) {
            text["$or"].push({title: new RegExp(filters.text, 'i')});
            text["$or"].push({description: new RegExp(filters.text, 'i')});
        } else {
            text = {}
        }
        return await this.jobOfferSchema
            .find(text)
            .limit(filters.limit)
            .sort({date: 'desc'});
    }

    async add(jobOffer: JobOfferDTO): Promise<JobOffer> {
        return await this.jobOfferSchema.create(jobOffer);
    }

    async set(id: string, setJobOffer: SetJobOfferDTO): Promise<JobOffer> {
        return await this.jobOfferSchema.findByIdAndUpdate(id, setJobOffer, { new: true });
    }

    async delete(id: string): Promise<boolean> {
        return await this.jobOfferSchema.findByIdAndDelete(id);
    }    
}