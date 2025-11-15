import { Appointment } from "@/models/Appointment";
import { UpdateQuery } from "mongoose";

export const AppointmentRepository = {
  create: (data: any) => Appointment.create(data),
  list: () => Appointment.find().populate("pet").populate("veterinarian"),
  findById: (id: any) => Appointment.findById(id),
  updateById: (id: any, data: UpdateQuery<any> | undefined) =>
    Appointment.findByIdAndUpdate(id, data, { new: true }),
};
