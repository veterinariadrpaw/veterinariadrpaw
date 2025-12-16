import React from 'react';
import { User } from '@/types/user';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export const UserList = ({ users, onEdit, onDelete }: UserListProps) => {
    return (
        <Card className="overflow-hidden">
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
                    {users.map((user) => (
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
    );
};
