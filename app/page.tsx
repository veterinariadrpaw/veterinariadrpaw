import Hero from "@/components/home/Hero";
import Values from "@/components/home/Values";
import Philosophy from "@/components/home/Philosophy";
import WelfarePolicy from "@/components/home/WelfarePolicy";
import History from "@/components/home/History";
import Calendar from "@/components/home/Calendar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />

      <WelfarePolicy />

      <History />

      <Philosophy />

      <Values />

      <ScrollReveal>
        <Calendar />
      </ScrollReveal>
    </div>
  );
}
