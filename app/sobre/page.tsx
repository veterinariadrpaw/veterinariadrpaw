import { AboutHeader } from "@/components/about/AboutHeader";
import { Achievements } from "@/components/about/Achievements";
import { History } from "@/components/about/History";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";

export default function AboutPage() {
    return (
        <div className="bg-white">

            {/* Header */}
            <AboutHeader />

            {/* Content */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

                {/* Misión y Equipo */}
                <MissionVision />

                {/* Historia de la veterinaria */}
                <History />

                {/* ¿Por qué elegirnos? */}
                <WhyChooseUs />

                {/* Contador de logros */}
                <Achievements />

            </div>
        </div>
    );
}
