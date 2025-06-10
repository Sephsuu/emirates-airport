import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' }) 
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 8 })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);