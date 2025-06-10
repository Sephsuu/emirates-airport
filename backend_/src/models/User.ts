import { Schema, model  } from "mongoose";
import { IUser } from "../lib/interfaces";

interface IUserDocument extends IUser, Document {};

const userSchema = new Schema<IUserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
})

const User = model<IUserDocument>("User", userSchema);

export { User, IUserDocument };