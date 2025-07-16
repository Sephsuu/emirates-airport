import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Continent {
    Africa = "Africa",
    Antartica = "Antartica",
    Asia = "Asia",
    Australia = "Australia",
    Europe = "Europe",
    NorthAmerica = "North America",
    SouthAmerica = "South America"
}

@Schema({ collection: "country" }) 
export class Country extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, enum: Object.values(Continent) })
    continent: Continent;
}

export const CountrySchema = SchemaFactory.createForClass(Country);