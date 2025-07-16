import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' }) 
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 8 })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);