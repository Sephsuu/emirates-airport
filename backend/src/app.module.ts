import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './_supabase/supabase.module';
import { UserModule } from './entities/users/user.module';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './entities/countries/country.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),

		AuthModule,
		CountryModule,
		SupabaseModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
