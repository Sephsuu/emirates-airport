import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './_supabase/supabase.module';
import { UserModule } from './entities/users/user.module';
import { AuthModule } from './auth/auth.module';
import { CountryModule } from './entities/countries/country.module';
import { CityModule } from './entities/cities/city.module';
import { DestinationModule } from './entities/destinations/destination.module';
import { AirportModule } from './entities/airports/airport.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),

		AirportModule,
		AuthModule,
		CityModule,
		CountryModule,
		DestinationModule,
		SupabaseModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
