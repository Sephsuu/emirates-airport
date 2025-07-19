import { Module } from "@nestjs/common";
import { CityService } from "./city.service";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CityController } from "./city.controller";

@Module({
    providers: [CityService,SupabaseService],
    controllers: [CityController]
})

export class CityModule {}