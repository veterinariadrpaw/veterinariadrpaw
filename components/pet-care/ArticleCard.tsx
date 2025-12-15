import React from "react";

export interface Article {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    link: string;
}

export const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                        {article.category}
                    </span>
                    <span className="text-gray-400 text-sm">{article.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>

                <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 font-medium hover:text-teal-800 transition-colors"
                >
                    Leer más →
                </a>
            </div>
        </div>
    );
};
