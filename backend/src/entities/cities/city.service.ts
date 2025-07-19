import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CityDTO, CreateCityDTO } from "./city.dto";

const table: string = "city";

@Injectable()
export class CityService {
    constructor(private supabaseService: SupabaseService) {}

    async getAllCities() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select(`
            id, name, country:country_id(
                id, name
            )
        `)
        .order('name', { ascending: true });

        if (error) throw Error(error.message);

        return data;
    }

    async createCity(city: CreateCityDTO) {
        const { data: existing, error: findError } = await this.supabaseService.client
        .from(table)
        .select("*")
        .eq('name', city.name);

        if (findError) throw Error(findError.message);
        if (existing && existing.length > 0) throw Error("City already exists.");

        const { data, error } = await this.supabaseService.client
        .from(table)
        .insert(city)
        .select('*')
        .single();

        if (error) throw Error(error.message);

        return data;
    } 

    async updateCity(city: CityDTO) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .update(city)
        .eq('id', city.id)
        .select('*')
        .single();

        if (error) throw Error(error.message);
        if (!data) throw Error("City does not exists.");

        return data;
    }

    async deleteCity(id: string) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .delete()
        .eq('id', id)
        .select('*')
        .single()

        if (error) throw Error(error.message);
        if (!data) throw Error("City does not exists.");

        return data;
    }
}