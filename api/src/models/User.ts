import mongoose from 'mongoose';
import { Role } from './Role';

export type UserDocument = mongoose.Document & {
    name: string;
    role: Role;
    email: string;
    password: string;
    notifications: boolean;
    passwordResetToken: string;
    passwordResetExpires: Date;
};

const userSchema = new mongoose.Schema(
    {
        name: String,
        role: Number,
        email: { type: String, unique: true, required: [true, "can't be blank"] },
        password: { type: String, required: [true, "can't be blank"] },
        notifications: Boolean,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true },
);

export const User = mongoose.model<UserDocument>('User', userSchema);
