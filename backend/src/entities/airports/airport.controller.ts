import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AirportService } from "./airport.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAirportDTO } from "./airport.dto";

@Controller('airports')
export class AirportController {
    constructor(private readonly airportService: AirportService) {}

    @Get()
    async getAllAirports() {
        return await this.airportService.getAllAirports();
    }

    @Post() 
    @UseInterceptors(FileInterceptor('image'))
    async createAirport(
        @Body() airport: CreateAirportDTO,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.airportService.createAirport(airport, file)
    }
}