import React from "react";
import { ArticleCard, Article } from "./ArticleCard";

export const ArticleList = () => {
    const articles: Article[] = [
        {
            title: "La importancia de la vacunación anual",
            excerpt:
                "Las vacunas protegen contra enfermedades mortales como moquillo, parvovirus y leptospirosis. Mantener el calendario al día reduce riesgos epidemiológicos.",
            date: "23 Nov 2023",
            category: "Salud Preventiva",
            link: "https://www.avma.org/resources/pet-owners/petcare/vaccinations",
        },
        {
            title: "Nutrición adecuada para cachorros según estudios veterinarios",
            excerpt:
                "Los cachorros requieren dietas ricas en proteínas y minerales para el desarrollo óseo. Un déficit temprano puede causar displasias y problemas musculares.",
            date: "15 Nov 2023",
            category: "Nutrición",
            link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6566793/",
        },
        {
            title: "Señales científicas del estrés en gatos",
            excerpt:
                "El estrés crónico en gatos puede causar enfermedades urinarias y problemas de comportamiento. Aprende a identificar signos clínicos validados.",
            date: "02 Nov 2023",
            category: "Comportamiento",
            link: "https://journals.sagepub.com/doi/10.1177/1098612X15571880",
        },
        {
            title: "Cuidado dental en perros mayores basado en evidencia",
            excerpt:
                "La enfermedad periodontal afecta al 80% de los perros mayores. La limpieza y prevención reducen infecciones y problemas cardíacos asociados.",
            date: "28 Oct 2023",
            category: "Geriatría",
            link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7099669/",
        },
    ];

    return (
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {articles.map((article) => (
                <ArticleCard key={article.title} article={article} />
            ))}
        </div>
    );
};
