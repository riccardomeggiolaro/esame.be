/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { JobOfferModule } from "@modules/job-offer/job-offer.module";
import { JobOfferController } from "./job-offer.controller";

@Module({
    imports: [JobOfferModule],
    controllers: [JobOfferController]
})
export class JobOfferApiModule {}