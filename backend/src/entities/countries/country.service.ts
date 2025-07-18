import { Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { SupabaseService } from "src/_supabase/supabase.service";

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
}