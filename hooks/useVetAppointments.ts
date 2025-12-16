import { useState, useEffect, useCallback } from "react";
import { Appointment, User, AppointmentFormData, AppointmentStatus } from "@/components/veterinario/citas/types";
import { filterByStatus, getPaginatedData, getTotalPages } from "@/components/veterinario/citas/utils";
import { AppointmentServices } from "@/lib/api/appointment.service";
import { UserServices } from "@/lib/api/user.service";

export const useVetAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<AppointmentStatus>("pendiente");
    const [currentPage, setCurrentPage] = useState<{ [key in AppointmentStatus]: number }>({
        pendiente: 1,
        aceptada: 1,
        cancelada: 1,
    });

    const fetchData = useCallback(async () => {
        try {
            // Parallel fetching using new services
            const [apptData, userData] = await Promise.all([
                AppointmentServices.getAllVeterinaryAppointments(),
                UserServices.getUserVeterinarianProfile(),
            ]);

            setAppointments(apptData);
            setCurrentUser(userData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const createAppointment = async (formData: AppointmentFormData) => {
        if (!currentUser) return false;

        try {
            await AppointmentServices.createNewAppointment({
                ...formData,
                veterinarian: currentUser._id,
            });
            await fetchData();
            return true;
        } catch (error) {
            console.error("Error creating appointment:", error);
            alert("Error creando cita");
            return false;
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await AppointmentServices.updateAppointmentStatus(id, status);
            // Optimistic or strict refresh check could be improved here, but strict for now
            await fetchData();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Filter and Pagination Logic
    const filteredAppointments = filterByStatus(appointments, activeTab);
    const totalPages = getTotalPages(filteredAppointments.length);
    const paginatedAppointments = getPaginatedData(
        filteredAppointments,
        currentPage[activeTab]
    );

    const handlePageChange = (page: number) => {
        setCurrentPage((prev) => ({ ...prev, [activeTab]: page }));
    };

    return {
        appointments,
        currentUser,
        loading,
        activeTab,
        setActiveTab,
        currentPage: currentPage[activeTab],
        totalPages,
        totalItems: filteredAppointments.length,
        paginatedAppointments,
        handlePageChange,
        updateStatus,
        createAppointment,
        refreshAppointments: fetchData
    };
};
