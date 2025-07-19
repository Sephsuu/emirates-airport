import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CityService } from "./city.service";
import { CityDTO, CreateCityDTO } from "./city.dto";

@Controller('cities')
export class CityController {
    constructor(private readonly cityService: CityService) {}

    @Get()
    async getAllCities() {
        return await this.cityService.getAllCities();
    }

    @Post()
    async createCity(@Body() city: CreateCityDTO) {
        return await this.cityService.createCity(city);
    }

    @Patch()
    async updateCity(@Body() city: CityDTO) {
        return await this.cityService.updateCity(city);
    }

    @Delete(':id')
    async deleteCity(@Param('id') id: string) {
        return await this.cityService.deleteCity(id);
    }
}