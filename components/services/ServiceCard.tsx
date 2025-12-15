import React from "react";

export interface ServiceSection {
    category: string;
    items: string[];
}

export const ServiceCard = ({ section }: { section: ServiceSection }) => {
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="px-6 py-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-teal-200 pb-2">
                    {section.category}
                </h3>
                <ul className="space-y-3">
                    {section.items.map((item) => (
                        <li key={item} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 text-teal-500">
                                •
                            </span>
                            <span className="ml-2 text-gray-600">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
