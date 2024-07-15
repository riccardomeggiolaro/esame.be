/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class RequestDTO {
    @IsString()
    surname: string;

    @IsString()
    name: string;
    
    @IsNumber()
    amount: number;
  
    @IsNumber()
    numberRate: number;

    @IsDateString()
    date: Date;
}

export class SetRequestDTO {
    @IsOptional()
    @IsString()
    surname: string;  

    @IsOptional()
    @IsString()
    name: string;  

    @IsOptional()
    @IsNumber()
    amount: number;

    @IsOptional()
    @IsNumber()
    numberRate: number;

    @IsOptional()
    @IsDateString()
    date: Date;
}

export class RangeRequestDTO {
    @IsOptional()
    @IsDateString()
    dateMin: Date;

    @IsOptional()
    @IsDateString()
    dateMax: Date;
}

export class FiltersRequestDTO extends RangeRequestDTO {
    @IsOptional()
    @IsString()
    surname: string;  

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumberString()
    amount: number;

    @IsOptional()
    @IsNumberString()
    numberRate: number;

    @IsOptional()
    @IsNumberString()
    limit: number;

    @IsOptional()
    @IsBoolean()
    @Transform((value) => {
        if (value.value === 'true') value.value = true;
        else if (value.value === 'false') value.value = false;
        return value.value
    })
    ascDate: boolean;
}