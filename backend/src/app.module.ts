import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './_supabase/supabase.module';
import { UserModule } from './users/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),

		SupabaseModule,
		UserModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
