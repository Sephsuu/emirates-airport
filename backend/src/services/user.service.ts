import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel : Model<User>) {}

    async getAllUsers(): Promise<User[]> {
        try {
            return this.userModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const getUser = await this.userModel.findById(id).exec();
            if (!getUser) {
                throw new NotFoundException("User not found");
            }
            return getUser;
        } catch (error) {
            throw new InternalServerErrorException("Internal Server Error")
        }
    } 

    async createUser(user: User): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            const newUser = new this.userModel({
                ...user,
                password: hashedPassword
            });
            return await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException("User already exist");
            }
            throw new InternalServerErrorException('Failed to create user.');
        }
    }

    async updateUser(id: string, user: Partial<User>): Promise<User> {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true}).exec();
            if (!updatedUser) {
                throw new NotFoundException("User not found")
            }
            return updatedUser;
        } catch (error) {
            throw new InternalServerErrorException("Failde to update user");
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
            if (!deletedUser) {
                throw new NotFoundException("User not found");
            }
            return deletedUser;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}