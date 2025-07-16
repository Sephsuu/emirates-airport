import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Country } from 'src/entities/country.entity';
import { CountryService } from 'src/services/country.service';

@Controller("countries")
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @Get()
    getAllCountries() {
        return this.countryService.getAllCountries();
    }

    @Get(':id')
    getCountryById(@Param('id') id: string) {
        return this.countryService.getCountryById(id);
    }

    @Post()
    async createCountry(@Body() country: Country): Promise<Country> {
        return this.countryService.createCountry(country);
    }
}