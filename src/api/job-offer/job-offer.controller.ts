/* eslint-disable prettier/prettier */
import { Public, setSchema } from '@core/decorators';
import { EntityExistGuard } from '@core/guards';
import { FiltersJobOfferDTO, JobOfferDTO, SetJobOfferDTO } from '@modules/job-offer/entity/job-offer.dto';
import { JobOffer } from '@modules/job-offer/entity/job-offer.schema';
import { JobOfferAbstractService } from '@modules/job-offer/service/job-offer.abstract.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@setSchema(JobOffer)
@Controller('job-offer')
export class JobOfferController {
    constructor(
        private jobOfferService: JobOfferAbstractService,
    ) {}

    @Public()
    @Get('list')
    async list(@Query() filters: FiltersJobOfferDTO): Promise<JobOffer[]> {
        return await this.jobOfferService.list(filters);
    }

    @Post('add')
    async add(@Body() jobOffer: JobOfferDTO): Promise<JobOfferDTO> {
        return await this.jobOfferService.add(jobOffer);
    }

    @Patch('set/:id')
    @UseGuards(EntityExistGuard)
    async set(@Param('id') id: string, @Body() request: SetJobOfferDTO): Promise<JobOffer> {
        const updated = await this.jobOfferService.set(id, request);
        return updated;
    }

    @Delete('delete/:id')
    @UseGuards(EntityExistGuard)
    async delete(@Param('id') id: string): Promise<{message: string}> {
        const deleted = await this.jobOfferService.delete(id);
        return {
            message: `Request removed ${deleted ? "succesfully" : "failed"}`
        }
    }
}
