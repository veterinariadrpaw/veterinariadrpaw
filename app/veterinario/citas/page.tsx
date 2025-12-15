"use client";

import { useState, useEffect } from "react";
import { Appointment, User, AppointmentFormData, ReasonModalData, AppointmentStatus } from "@/components/veterinario/citas/types";
import { filterByStatus, getPaginatedData, getTotalPages } from "@/components/veterinario/citas/utils";
import AppointmentForm from "@/components/veterinario/citas/AppointmentForm";
import AppointmentTabs from "@/components/veterinario/citas/AppointmentTabs";
import AppointmentMobileCard from "@/components/veterinario/citas/AppointmentMobileCard";
import AppointmentTable from "@/components/veterinario/citas/AppointmentTable";
import AppointmentPagination from "@/components/veterinario/citas/AppointmentPagination";
import ReasonModal from "@/components/veterinario/citas/ReasonModal";

export default function VetAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [showReasonModal, setShowReasonModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState<ReasonModalData | null>(null);

    const [activeTab, setActiveTab] = useState<AppointmentStatus>("pendiente");

    const [currentPage, setCurrentPage] = useState({
        pendiente: 1,
        aceptada: 1,
        cancelada: 1,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [apptRes, userRes] = await Promise.all([
                fetch("/api/appointments"),
                fetch("/api/users/me"),
            ]);

            if (apptRes.ok) {
                const data = await apptRes.json();
                setAppointments(data);
            }

            if (userRes.ok) {
                const data = await userRes.json();
                setCurrentUser(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (formData: AppointmentFormData) => {
        if (!currentUser) return;

        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    veterinarian: currentUser._id,
                }),
            });

            if (res.ok) {
                setShowForm(false);
                const apptRes = await fetch("/api/appointments");
                if (apptRes.ok) {
                    setAppointments(await apptRes.json());
                }
            } else {
                const err = await res.json();
                alert("Error creando cita: " + err.message);
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/appointments?id=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (res.ok) {
                const apptRes = await fetch("/api/appointments");
                if (apptRes.ok) {
                    setAppointments(await apptRes.json());
                }
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleViewReason = (reason: string, pet: string, date: string) => {
        setSelectedReason({ reason, pet, date });
        setShowReasonModal(true);
    };

    // Get filtered and paginated appointments for current tab
    const filteredAppointments = filterByStatus(appointments, activeTab);
    const totalPages = getTotalPages(filteredAppointments.length);
    const paginatedAppointments = getPaginatedData(
        filteredAppointments,
        currentPage[activeTab]
    );

    const handlePageChange = (page: number) => {
        setCurrentPage((prev) => ({ ...prev, [activeTab]: page }));
    };

    const handleTabChange = (tab: AppointmentStatus) => {
        setActiveTab(tab);
    };

    return (
        <div className="p-4 md:p-0">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gestión de Citas</h1>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    {showForm ? "Cancelar" : "Nueva Cita"}
                </button>
            </div>

            {showForm && (
                <AppointmentForm
                    currentUser={currentUser}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <AppointmentTabs
                        activeTab={activeTab}
                        appointments={appointments}
                        onTabChange={handleTabChange}
                    />

                    {paginatedAppointments.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
                            No hay citas {activeTab}s
                        </div>
                    ) : (
                        <>
                            {/* MOBILE VIEW */}
                            <div className="md:hidden space-y-4">
                                {paginatedAppointments.map((app) => (
                                    <AppointmentMobileCard
                                        key={app._id}
                                        appointment={app}
                                        onUpdateStatus={updateStatus}
                                        onViewReason={handleViewReason}
                                    />
                                ))}
                            </div>

                            {/* DESKTOP VIEW */}
                            <AppointmentTable
                                appointments={paginatedAppointments}
                                onUpdateStatus={updateStatus}
                                onViewReason={handleViewReason}
                            />

                            {/* Pagination */}
                            <AppointmentPagination
                                currentPage={currentPage[activeTab]}
                                totalPages={totalPages}
                                totalItems={filteredAppointments.length}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}

                    {showReasonModal && selectedReason && (
                        <ReasonModal
                            data={selectedReason}
                            onClose={() => setShowReasonModal(false)}
                        />
                    )}
                </>
            )}
        </div>
    );
}
