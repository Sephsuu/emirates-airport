import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryService } from 'src/services/country.service';
import { Country, CountrySchema } from 'src/entities/country.entity';
import { CountryController } from 'src/controllers/country.controller';

@Module({
    imports: [MongooseModule.forFeature([{
        name: Country.name,
        schema: CountrySchema
    }])],
    
    controllers: [CountryController],
    providers: [CountryService],
})

export class CountryModule {}