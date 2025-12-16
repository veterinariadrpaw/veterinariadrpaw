import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { GalleryMobileCard } from './GalleryMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface GalleryImage {
    _id: string;
    title: string;
    imageUrl: string;
    createdAt: string;
}

interface GalleryListProps {
    images: GalleryImage[];
    onDelete: (id: string) => void;
}

export const GalleryList = ({ images, onDelete }: GalleryListProps) => {
    const {
        paginatedItems: paginatedImages,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange
    } = usePagination(images, 10);

    if (images.length === 0) {
        return (
            <Card className="p-8 text-center text-gray-700">
                No hay imágenes en la galería.
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {paginatedImages.map((img) => (
                    <GalleryMobileCard
                        key={img._id}
                        image={img}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vista Previa</TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedImages.map((img) => (
                            <TableRow key={img._id}>
                                <TableCell>
                                    <img
                                        src={img.imageUrl}
                                        alt={img.title}
                                        className="h-16 w-16 object-cover rounded-md border"
                                    />
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">{img.title}</TableCell>
                                <TableCell className="text-gray-700">
                                    {new Date(img.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onDelete(img._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Eliminar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
