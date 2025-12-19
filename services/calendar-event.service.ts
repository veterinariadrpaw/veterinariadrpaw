import { CalendarEventRepository } from "@/repositories/calendar-event.repo";
import { ICalendarEvent } from "@/models/CalendarEvent";
import { UpdateQuery } from "mongoose";

export const CalendarEventService = {
    create: (data: Partial<ICalendarEvent>) => CalendarEventRepository.create(data),
    listAll: () => CalendarEventRepository.findAll(),
    getOne: (id: string) => CalendarEventRepository.findById(id),
    update: (id: string, data: UpdateQuery<ICalendarEvent>) => CalendarEventRepository.updateById(id, data),
    delete: (id: string) => CalendarEventRepository.deleteById(id),
};
