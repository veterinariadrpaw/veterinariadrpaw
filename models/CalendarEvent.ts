import mongoose, { Schema, Document } from "mongoose";

export interface ICalendarEvent extends Document {
    title: string;
    date: string;
    description: string;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
}

const CalendarEventSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        date: { type: String, required: true }, // Format: YYYY-MM-DD
        description: { type: String, required: true },
        location: { type: String },
    },
    {
        timestamps: true,
    }
);

export const CalendarEvent = mongoose.models.CalendarEvent || mongoose.model<ICalendarEvent>("CalendarEvent", CalendarEventSchema);
