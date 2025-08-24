import { Injectable } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CreateRouteDTO, RouteDTO } from "./route.dto";

const table = 'route';

@Injectable()
export class RouteService {
    constructor(private supabaseService: SupabaseService) {}

    async getAllRoutes() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select(`
            id, type, created_at,
            departure_airport:departure_airport_id(
                id, name, logo_url
            ),
            departure_city:departure_city_id(
                id, name
            ),
            arrival_airport:arrival_airport_id(
                id, name, logo_url
            ),
            arrival_city:arrival_city_id(
                id, name
            )
        `);

        if (error) throw Error(error.message);

        return data;
    }

    async createRoute(route: CreateRouteDTO) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .insert(route)
        .select('*')
        .single();

        if (error) throw Error(error.message);

        return data;
    }

    async updateRoute(route: RouteDTO) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .update(route)
        .eq('id', route.id)
        .select('*')
        .single();

        if (error) throw Error(error.message);
        if (!data) throw Error("City does not exists.");

        return data;
    }

    async deleteRoute(id: string) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .delete()
        .eq('id', id)
        .select('*')
        .single();

        if (error) throw Error(error.message);
        if (!data) throw Error("City does not exists.");

        return data;
    }
}