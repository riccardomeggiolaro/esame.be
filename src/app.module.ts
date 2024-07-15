/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IsExistingProvider } from '@core/validators';
import { JobOfferAbstractService } from '@modules/job-offer/service/job-offer.abstract.service';
import { JobOfferService } from '@modules/job-offer/service/job-offer.service';
import { JobOfferModule } from '@modules/job-offer/job-offer.module';
import { JobOfferController } from './api/job-offer/job-offer.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
    JobOfferModule.forRoot([
      { provide: JobOfferAbstractService, useClass: JobOfferService }
    ]),
  ],
  controllers: [AppController, JobOfferController],
  providers: [AppService, IsExistingProvider],
})
export class AppModule {}
