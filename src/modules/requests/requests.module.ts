/* eslint-disable prettier/prettier */
import { DynamicModule, Module, Provider } from "@nestjs/common";
import { RequetsAbstractService } from "./service/requests.abstract.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Request, RequestSchema } from "./entity/requests.schema";

@Module({})
export class RequestsModule {
    static forRoot(providers: Provider[], global = true): DynamicModule {
        return {
            global,
            module: RequestsModule,
            imports: [MongooseModule.forFeature([{ name: Request.name, schema: RequestSchema }])],
            providers: [
                ...providers
            ],
            exports: [
                RequetsAbstractService
            ]
        }
    }
}