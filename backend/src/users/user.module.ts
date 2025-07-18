import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./users.service";
import { SupabaseService } from "src/_supabase/supabase.service";

@Module({
    controllers: [UserController],
    providers: [UserService, SupabaseService],
})

export class UserModule {}