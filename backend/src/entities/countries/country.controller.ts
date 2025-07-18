import { Body, Controller, Get, Post } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CreateCountryDTO } from "./country.dto";

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
}