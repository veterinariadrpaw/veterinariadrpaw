import { CalendarEvent, ICalendarEvent } from "@/models/CalendarEvent";
import dbConnect from "@/lib/db";
import { UpdateQuery } from "mongoose";

export const CalendarEventRepository = {
    create: async (data: Partial<ICalendarEvent>) => {
        await dbConnect();
        return CalendarEvent.create(data);
    },

    findAll: async () => {
        await dbConnect();
        return CalendarEvent.find().sort({ date: 1 }).lean();
    },

    findById: async (id: string) => {
        await dbConnect();
        return CalendarEvent.findById(id).lean();
    },

    updateById: async (id: string, data: UpdateQuery<ICalendarEvent>) => {
        await dbConnect();
        return CalendarEvent.findByIdAndUpdate(id, data, { new: true });
    },

    deleteById: async (id: string) => {
        await dbConnect();
        return CalendarEvent.findByIdAndDelete(id);
    },
};
