import mongoose from 'mongoose';
import { Robiot, RobiotDocument } from './Robiot';

export type ConfigurationDocument = mongoose.Document & {
    id: number;
    name: string;
    content: string;
    robiot: RobiotDocument;
};

const configurationSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        content: String,
        robiot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Robiot',
        },
    },
    { timestamps: true },
);

export const Configuration = mongoose.model<ConfigurationDocument>('User', configurationSchema);
