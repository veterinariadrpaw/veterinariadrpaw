import { AppointmentRepository } from "@/repositories/appointment.repo";
import { UpdateQuery } from "mongoose";

export const AppointmentService = {
  create: (data: any) => AppointmentRepository.create(data),
  list: () => AppointmentRepository.list(),
  update: (id: any, data: UpdateQuery<any> | undefined) => AppointmentRepository.updateById(id, data),
};
