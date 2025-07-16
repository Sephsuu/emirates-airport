import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country } from 'src/entities/country.entity';

@Injectable()
export class CountryService {
    constructor (@InjectModel(Country.name) private countryModel : Model<Country>) {}

    async getAllCountries(): Promise<Country[]> {
        try {
            return this.countryModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getCountryById(id: string): Promise<Country> {
        try {
            const getCountry = await this.countryModel.findById(id).exec();
            if (!getCountry) {
                throw new NotFoundException("Country not found");
            }
            return getCountry;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createCountry(country: Country): Promise<Country> {
        try {
            const newCountry = new this.countryModel(country);
            console.log(newCountry);
            
            return await newCountry.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("Country already exists");
            }
            throw new InternalServerErrorException(error);
        }
    }
}