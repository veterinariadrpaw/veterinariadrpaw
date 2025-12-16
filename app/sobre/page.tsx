import { AboutHeader } from "@/components/about/AboutHeader";
import { Achievements } from "@/components/about/Achievements";
import { History } from "@/components/about/History";
import { MissionVision } from "@/components/about/MissionVision";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { GallerySection } from "@/components/about/GallerySection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function AboutPage() {
    return (
        <div className="bg-white">

            {/* Header */}
            <AboutHeader />

            {/* Content */}
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-24">

                {/* Misión y Equipo */}
                <ScrollReveal>
                    <MissionVision />
                </ScrollReveal>

                {/* Historia de la veterinaria */}
                <ScrollReveal delay={200}>
                    <History />
                </ScrollReveal>

                {/* ¿Por qué elegirnos? */}
                <ScrollReveal>
                    <WhyChooseUs />
                </ScrollReveal>

                {/* Contador de logros */}
                <ScrollReveal>
                    <Achievements />
                </ScrollReveal>

                {/* Galería Dinámica */}
                <GallerySection />

            </div>
        </div>
    );
}
