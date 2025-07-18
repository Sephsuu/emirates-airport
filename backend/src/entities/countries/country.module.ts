import { Module } from "@nestjs/common";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";
import { SupabaseService } from "src/_supabase/supabase.service";

@Module({
    providers: [CountryService, SupabaseService],
    controllers: [CountryController]
})

export class CountryModule {}