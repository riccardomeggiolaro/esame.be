/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection, Types } from "mongoose";
import { setSchema } from "../decorators/set-schema.decorator";

@Injectable()
export class EntityExistGuard implements CanActivate {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const modelClass = this.reflector.get(setSchema, context.getClass());
        const request = context.switchToHttp().getRequest();
        const entityId = request.params.id;

        const validatioObjectId = Types.ObjectId.isValid(entityId);

        if (!validatioObjectId) {
            throw new BadRequestException('Invalid objectId');
        }

        const entity = await this.connection.models[modelClass.name].findById(entityId);

        if (!entity) {
            throw new NotFoundException(`Entity not found in collection ${modelClass.name}`)
        }

        return true;
    }
}