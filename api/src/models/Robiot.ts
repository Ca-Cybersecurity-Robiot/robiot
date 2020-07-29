import mongoose from 'mongoose';
import { Configuration, ConfigurationDocument } from './Configuration';

export type RobiotDocument = mongoose.Document & {
    name: string;
    ipAddr: string;
    id: number;
    configuration: ConfigurationDocument[];
};

const robiotSchema = new mongoose.Schema(
    {
        name: String,
        ipAddr: Number,
        id: Number,
        configuration: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Configuration' }],
    },
    { timestamps: true },
);

export const Robiot = mongoose.model<RobiotDocument>('Robiot', robiotSchema);
