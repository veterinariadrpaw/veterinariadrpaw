"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";

interface CalendarEvent {
    _id: string;
    title: string;
    date: string;
    description: string;
    location?: string;
}

export default function CalendarContent() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/calendar-events");
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (info: any) => {
        info.jsEvent.preventDefault();
        const event = events.find(e => e.title === info.event.title && e.date === info.event.startStr);
        if (!event) return;

        // Format dates for Google Calendar (YYYYMMDD)
        const dateStr = event.date.replace(/-/g, "");

        // Calculate end date (next day) for all-day event
        const startDate = new Date(event.date + "T00:00:00");
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        const endDateStr = endDate.toISOString().split('T')[0].replace(/-/g, "");

        const googleUrl = new URL("https://www.google.com/calendar/render");
        googleUrl.searchParams.append("action", "TEMPLATE");
        googleUrl.searchParams.append("text", event.title);
        googleUrl.searchParams.append("dates", `${dateStr}/${endDateStr}`);
        googleUrl.searchParams.append("details", event.description);
        if (event.location) {
            googleUrl.searchParams.append("location", event.location);
        }

        window.open(googleUrl.toString(), "_blank");
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-lg flex items-center justify-center h-[500px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white text-black shadow-lg rounded-xl p-4">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                }}
                events={events.map(e => ({
                    title: e.title,
                    date: e.date,
                }))}
                height="auto"
                fixedWeekCount={false}
                eventClick={handleEventClick}
                eventMouseEnter={(info) => {
                    info.el.style.cursor = 'pointer';
                }}
            />
        </div>
    );
}
