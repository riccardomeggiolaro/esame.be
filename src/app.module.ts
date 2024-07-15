/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { IsExistingProvider } from '@core/validators';
import { RequestService, RequestsModule, RequetsAbstractService } from '@modules/requests';

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
    RequestsModule.forRoot([
      { provide: RequetsAbstractService, useClass: RequestService }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, IsExistingProvider],
})
export class AppModule {}
