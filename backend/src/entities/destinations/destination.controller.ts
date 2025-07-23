import { Body, Controller, Get, Post } from "@nestjs/common";
import { DestinationService } from "./destination.service";
import { CreateDestinationDTO } from "./destination.dto";

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
}