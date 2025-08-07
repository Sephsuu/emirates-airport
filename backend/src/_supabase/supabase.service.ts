// src/supabase/supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_KEY!
        );
    }

    get client() {
        return this.supabase;
    } 

    async getUser(accessToken: string) {
        const { data: user, error } = await this.supabase.auth.getUser(accessToken);
        if (error) throw error;
        return user;
    }

    async refreshSession(refreshToken: string) {
        const { data, error } = await this.supabase.auth.refreshSession({
            refresh_token: refreshToken,
        });
        if (error) throw error;
        return data;
    }

    async uploadImage(bucket: string, path: string, file: Buffer, contentType: string) {
        const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(path, file, { contentType, upsert: true });

        if (error) throw ('Error on upload image');

        return data;
    }

    getPublicUrl(bucket: string, path: string) {
        const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
    }
}