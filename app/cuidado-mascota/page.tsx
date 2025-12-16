import { ArticleList } from "@/components/pet-care/ArticleList";
import { PetCareHeader } from "@/components/pet-care/PetCareHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function PetCarePage() {
    return (
        <div className="bg-gray-50 min-h-screen py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal>
                    <PetCareHeader />
                </ScrollReveal>
                <ScrollReveal delay={200}>
                    <ArticleList />
                </ScrollReveal>
            </div>
        </div>
    );
}
