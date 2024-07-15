/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { JobOffer } from "../entity/job-offer.schema";
import { FiltersJobOfferDTO, JobOfferDTO, SetJobOfferDTO } from "../entity/job-offer.dto";

@Injectable()
export abstract class JobOfferAbstractService {
    abstract list(filters: FiltersJobOfferDTO): Promise<JobOffer[]>;
    abstract add(jobOffer: JobOfferDTO): Promise<JobOffer>;
    abstract set(id: string, jobOfferSet: SetJobOfferDTO): Promise<JobOffer>;
    abstract delete(id: string): Promise<boolean>;
}