import { Injectable, NotFoundException } from "@nestjs/common";
import { SupabaseService } from "src/_supabase/supabase.service";
import { CreateUserDTO, GetUserDTO, UserDTO } from "./user.dto";
import * as bcrypt from 'bcrypt';

const table = '_user';

@Injectable()
export class UserService {
    constructor (private supabaseService: SupabaseService) {}

    async getAllUsers() {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select('email, created_at');

        if (error) {
            throw new Error(error.message)
        }

        return data;
    }

    async findById(id: string): Promise<UserDTO> {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select('*')
        .eq('id', id)
        .single();

        if (error) {
            throw new Error(error.message)
        }

        return data;
    }

    async findUserByEmail(email: string): Promise<UserDTO> {
        const { data, error } = await this.supabaseService.client
        .from(table)
        .select('*')
        .eq('email', email)
        .single();

        return data;
    }

    async createUser(payload: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(payload.password, 10);
        const { data, error} = await this.supabaseService.client
        .from(table)
        .insert([{
            ...payload,
            password: hashedPassword
        }])
        .select('id, email, created_at')

        if (error) {
            throw new Error(error.message)
        }

        return data[0];
    }

    async updateUser(id: string, updatedUser: CreateUserDTO) {
        const user = await this.findById(id);
        if (!user) throw new NotFoundException('Data not found');

        const { data, error } = await this.supabaseService.client
        .from(table)
        .update(updatedUser)
        .eq('id', id)
        .select('email, created_at');

        if (error) throw new Error(error.message);

        return data[0];

    }

}