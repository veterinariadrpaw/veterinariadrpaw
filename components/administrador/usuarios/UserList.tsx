import React from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';
import { UserMobileCard } from './UserMobileCard';
import { Pagination } from '@/components/ui/Pagination';
import { usePagination } from '@/hooks/usePagination';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
    const {
        paginatedItems: paginatedUsers,
        currentPage,
        totalPages,
        totalItems,
        handlePageChange
    } = usePagination(users, 10);

    if (users.length === 0) {
        return (
            <Card className="p-8 text-center text-gray-500">
                No hay usuarios registrados.
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {paginatedUsers.map((user) => (
                    <UserMobileCard
                        key={user._id}
                        user={user}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>

            {/* Desktop View */}
            <Card className="hidden md:block overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            user.role === 'administrador' ? 'info' :
                                                user.role === 'veterinario' ? 'default' :
                                                    'success'
                                        }
                                    >
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(user)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete(user._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
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
