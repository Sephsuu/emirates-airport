import { Module } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { AirportService } from "./airport.service";
import { AirportController } from "./airport.controller";

@Module({
    providers: [AirportService, SupabaseService],
    controllers: [AirportController]
})

export class AirportModule {}