import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function ContactPage() {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <ContactHeader />
                </ScrollReveal>

                <ScrollReveal delay={200} className="mt-12 bg-white shadow sm:rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ContactOptions />
                        <ContactInfo />
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
