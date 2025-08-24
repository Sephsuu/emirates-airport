import { Module } from "@nestjs/common";
import { FlightService } from "./flight.service";
import { SupabaseService } from "src/_supabase/supabase.service";
import { FlightController } from "./flight.controller";
import { FlightGateway } from "src/gateway/flight.gateway";

@Module({
  providers: [FlightService, FlightGateway, SupabaseService],
  controllers: [FlightController],
  exports: [FlightService, FlightGateway],
})
export class FlightModule {}
