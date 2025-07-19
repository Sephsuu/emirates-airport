import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CountryDTO, CreateCountryDTO } from "./country.dto";

@Controller('countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get()
    async getAllCountries() {
        return await this.countryService.getAllCountries();
    } 

    @Post()
    async createCountry(@Body() country: CreateCountryDTO) {
        return await this.countryService.createCountry(country);
    }

    @Patch()
    async updateCountry(@Body() country: CountryDTO) {
        return this.countryService.updateCountry(country);
    }
    
    @Delete(':id')
    async deleteCountry(@Param('id') id: string) {
        return this.countryService.deleteCountry(id);
    }
}