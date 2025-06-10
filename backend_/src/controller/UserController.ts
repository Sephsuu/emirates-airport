import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email,
            password: hashedPassword
        })
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).json({ message: "User not found" });
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}