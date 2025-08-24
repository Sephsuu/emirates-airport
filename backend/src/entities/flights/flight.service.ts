import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { error } from "console";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CreateFlightDTO } from "./flight.dto";
import { FlightGateway } from "src/gateway/flight.gateway";

const table = 'flight';

@Injectable()
export class FlightService {
    constructor(
        private supabaseService: SupabaseService,
        @Inject(forwardRef(() => FlightGateway))
        private flightGateway: FlightGateway,
    ) {}

    async getAllFlights() {
        const { data, error } = await this.supabaseService.client
        .from('read_all_flights')
        .select(`*`);
        
        if (error) new Error(error.message);

        return data;
    }

    async createFlight(flight: CreateFlightDTO) {
        const { data: existing, error: findError } = await this.supabaseService.client
        .from(table)
        .select('*')
        .eq('flight_no', flight.flight_no)

        if (findError) throw new InternalServerErrorException(findError.message);
        if (existing && existing.length > 0) throw new BadRequestException('Flight already exists.');

        const { data, error } = await this.supabaseService.client
        .from(table)
        .insert(flight)
        .select('*')
        .single();

        if (error) throw new InternalServerErrorException(error.message);
        await this.flightGateway.broadcastFlights();
        return data;
    }

    async deleteFlight(id: string) {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .delete()
        .eq('id', id)
        .select('*')
        .single();

        if (error) throw new InternalServerErrorException(error.message);
        if (!data) throw new BadRequestException('Flight not found');

        return data;
    }
}