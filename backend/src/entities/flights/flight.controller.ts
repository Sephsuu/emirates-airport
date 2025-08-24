import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { FlightService } from "./flight.service";
import { CreateFlightDTO } from "./flight.dto";

@Controller('flights')
export class FlightController {
    constructor(private readonly flightService: FlightService) {}

    @Get()
    async getAllFlights() {
        return await this.flightService.getAllFlights();
    }

    @Post()
    async createFlight(@Body() flight: CreateFlightDTO) {
        return await this.flightService.createFlight(flight);
    }

    @Delete(':id')
    async deleteFlight(@Param('id') id: string) {
        return this.flightService.deleteFlight(id);
    }
}