import { Appointment } from "./types";

/**
 * Filter appointments by status and sort by date (newest first)
 */
export const filterByStatus = (appointments: Appointment[], status: string): Appointment[] => {
    return appointments
        .filter((app) => app.status === status)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/**
 * Get paginated data from array
 */
export const getPaginatedData = <T>(data: T[], page: number, itemsPerPage = 10): T[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
};

/**
 * Calculate total number of pages
 */
export const getTotalPages = (total: number, itemsPerPage = 10): number => {
    return Math.ceil(total / itemsPerPage);
};

/**
 * Generate array of page numbers for pagination display
 */
export const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
    const pages = [];
    const maxPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);

    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
};
