import { Module } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { DestinationService } from "./destination.service";
import { DestinationController } from "./destination.controller";

@Module({
    providers: [DestinationService, SupabaseService],
    controllers: [DestinationController]
})

export class DestinationModule {}