import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CountryDTO, CreateCountryDTO } from "./country.dto";
import { error } from "console";

const table = 'country';

@Injectable()
export class CountryService {
    constructor(private supabaseService: SupabaseService) {}

    async getAllCountries() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select('*')
        .order('name', { ascending: true })

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

    async updateCountry(country: CountryDTO) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .update(country)
        .eq('id', country.id)
        .select('*')
        .single();

        if (error) throw Error(error.message);
        if (!data) throw Error("Country did not exists.");

        return data;
    }

    async deleteCountry(id: string) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .delete()
        .eq('id', id)
        .select('*')
        .single();

        if (error) throw Error(error.message);
        if (!data) throw Error("Country do not exists");

        return data;
    }
}