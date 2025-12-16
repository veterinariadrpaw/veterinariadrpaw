import { ServiceList } from "@/components/services/ServiceList";
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ServicesPage() {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <ServicesHeader />
                </ScrollReveal>
                <ScrollReveal delay={200}>
                    <ServiceList />
                </ScrollReveal>
            </div>
        </div>
    );
}
