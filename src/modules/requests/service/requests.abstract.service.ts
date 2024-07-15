/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { Request } from "../entity/requests.schema";
import { FiltersRequestDTO, RangeRequestDTO, RequestDTO, SetRequestDTO } from "../entity/request.dto";

@Injectable()
export abstract class RequetsAbstractService {
    abstract get(id: string): Promise<Request>;
    abstract list(filters: FiltersRequestDTO): Promise<Request[]>;
    abstract add(request: RequestDTO): Promise<Request>;
    abstract set(id: string, setRequest: SetRequestDTO): Promise<Request>;
    abstract delete(id: string): Promise<boolean>;
    abstract totalAmount(filters: RangeRequestDTO): Promise<number>;
    abstract averageRate(filters: RangeRequestDTO): Promise<number>;
}