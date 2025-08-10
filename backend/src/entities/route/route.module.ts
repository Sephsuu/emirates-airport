import { Module } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { RouteService } from "./route.service";
import { RouteController } from "./route.controller";

@Module({
    providers: [RouteService, SupabaseService],
    controllers: [RouteController]
})

export class RouteModule {}