import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { CreateDestinationDTO, DestinationDTO } from "./destination.dto";

@Controller('destinations')
export class DestinationController {
    constructor(private readonly destinationService: DestinationService) {}

    @Get()
    async getAllDestinations() {
        return await this.destinationService.getAllDestinations();
    } 

    @Post()
    async createDestination(@Body() destination: CreateDestinationDTO) {
        return await this.destinationService.createDestination(destination);
    }

    @Patch()
    async updateDestination(@Body() destination: DestinationDTO) {
        return await this.destinationService.updateDestination(destination);
    }

    @Delete(':id')
    async deleteDestination(@Param('id') id: string) {
        return await this.destinationService.deleteDestination(id);
    }
}