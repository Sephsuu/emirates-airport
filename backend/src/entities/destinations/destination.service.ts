import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CreateDestinationDTO, DestinationDTO } from "./destination.dto";

const table = 'destination';

@Injectable()
export class DestinationService {
    constructor(private supabaseService: SupabaseService) {}

    async getAllDestinations() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select(`
            id, name, image_url,
            city:city_id(
                id, name
            ),
            country:country_id(
                id, name
            )
        `);

        if (error) throw Error(error.message);

        return data;
    }

    async createDestination(destination: CreateDestinationDTO) {
        const { data: existing, error: findError } = await this.supabaseService.client
        .from(table)
        .select('*')
        .eq('name', destination.name);

        if (findError) throw Error(findError.message);
        if (existing && existing.length > 0) throw Error('Destination already exists');

        const { data, error } = await this.supabaseService.client
        .from(table)
        .insert(destination)
        .select('*')
        .single();

        if (error) throw Error(error.message);

        return data;
    }

    async updateDestination(destination: DestinationDTO) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .update(destination)
        .eq('id', destination.id)
        .select('*')
        .single();

        if (error) throw Error(error.message);
        if (!data) throw Error('Destination does not exists.');

        return data;
    }
}