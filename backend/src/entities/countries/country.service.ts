import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CreateCountryDTO } from "./country.dto";

const table = 'country';

@Injectable()
export class CountryService {
    constructor(private supabaseService: SupabaseService) {}

    async getAllCountries() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select('*')

        if (!data) throw new Error(error.message)

        return data;
    }

    async createCountry(country: CreateCountryDTO) {
        const { data: existing, error: findError } = await this.supabaseService.client
        .from(table)
        .select('*')
        .or(`code.eq.${country.code},name.eq.${country.name}`);
        
        if (findError) throw Error(findError.message);
        if (existing && existing.length > 0) throw Error('Country already exists.');

        const { data, error } = await this.supabaseService.client
        .from(table)
        .insert(country)
        .select('*')
        .single();        

        if (error) throw new Error(error.message);

        return data;
    }
}