"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function CalendarContent() {

    const [events] = useState([
        {
            title: "Vacunación antirrábica",
            date: "2025-11-26",
            url: "#",
        },
        {
            title: "Desparasitación general",
            date: "2025-12-10",
            url: "#",
        },
        {
            title: "Control veterinario anual",
            date: "2025-07-15",
            url: "#",
        },
        {
            title: "Vacuna polivalente",
            date: "2025-03-20",
            url: "#",
        },
    ]);

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
                events={events}
                height="auto"
                fixedWeekCount={false}
                eventClick={(info) => {
                    info.jsEvent.preventDefault();
                }}
            />
        </div>
    );
}
