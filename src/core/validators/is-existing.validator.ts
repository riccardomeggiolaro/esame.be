/* eslint-disable prettier/prettier */
import { Injectable, Type } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from "class-validator";
import { Connection } from "mongoose";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistingProvider implements ValidatorConstraintInterface {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        try {
            const result = await this.connection.models[args.constraints[0].name].findById(value);
            return !!result;
        } catch(e) {
            return false;
        }
    }

    defaultMessage?(args?: ValidationArguments): string {
        return `${args.property} field must refer to existing ${args.constraints[0].name} document`;
    }    
}

export const IsExisting = 
    <TModel extends object>(ModelClass: Type<TModel>, options?: ValidationOptions) =>
    (object: NonNullable<unknown>, propertyName: string) =>
    registerDecorator({
        name: 'IsExisting',
        target: object.constructor,
        propertyName,
        options,
        constraints: [ModelClass],
        validator: IsExistingProvider
    })