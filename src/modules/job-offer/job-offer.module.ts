/* eslint-disable prettier/prettier */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobOffer, JobOfferSchema } from './entity/job-offer.schema';
import { JobOfferAbstractService } from './service/job-offer.abstract.service';

@Module({})
export class JobOfferModule {
    static forRoot(providers: Provider[], global = true): DynamicModule {
        return {
            global,
            module: JobOfferModule,
            imports: [MongooseModule.forFeature([{ name: JobOffer.name, schema: JobOfferSchema }])],
            providers: [
                ...providers
            ],
            exports: [
                JobOfferAbstractService
            ]
        }
    }
}