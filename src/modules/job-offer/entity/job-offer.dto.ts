/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class JobOfferDTO {
    @IsString()
    title: string;
    
    @IsString()
    description: string;
    
    @IsDateString()
    date: Date;
    
    @IsNumber()
    @Min(1)
    grossSalary: number;
}

export class SetJobOfferDTO {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsDateString()
    date: Date;

    @IsOptional()
    @IsNumber()
    @Min(1)
    grossSalary: number;
}

export class FiltersJobOfferDTO {
    @IsOptional()
    @Transform(value => Number(value.value))
    @IsNumber()
    @Min(1)
    limit: number;

    @IsOptional()
    @IsString()
    text: string;
}