import { ServiceList } from "@/components/services/ServiceList";
import { ServicesHeader } from "@/components/services/ServicesHeader";

export default function ServicesPage() {
    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ServicesHeader />
                <ServiceList />
            </div>
        </div>
    );
}
