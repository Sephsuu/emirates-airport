import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CreateAirportDTO } from "./airport.dto";

const table = 'airport';

@Injectable()
export class AirportService {
    constructor(private supabaseService: SupabaseService) {}

    async getAllAirports() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select(`
            id, name, logo_url,
            country:country_id(
                id, name
            )
        `)
        .order('name', { ascending: true });

        if (error) throw new InternalServerErrorException(error.message);

        return (data);
    }

    async createAirport(airport: CreateAirportDTO, file?) {
        let logo_url = '';
        console.log(file);
        
        if (file) {
            const bucket = 'images';
            const filePath = `airports/${Date.now()}_${file.originalname}`;

            await this.supabaseService.uploadImage(bucket, filePath, file.buffer, file.mimetype);

            logo_url = this.supabaseService.getPublicUrl(bucket, filePath);
        }

        const { data, error } = await this.supabaseService.client
        .from(table)
        .insert([{
            ...airport,
            logo_url: logo_url
        }]) 
        .select()

        if (error) throw new InternalServerErrorException(error.message);
        
        return data;
    }
}