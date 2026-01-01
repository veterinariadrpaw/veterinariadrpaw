import React from 'react';
import { User } from '@/types/user';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { useTranslations, useLocale } from 'next-intl';

export const RecentUsers = ({ users }: { users: User[] }) => {
    const t = useTranslations('AdminDashboard.dashboard.recentRecords');
    const tr = useTranslations('AdminDashboard.roles');
    const tc = useTranslations('ClientPanel.common');
    const locale = useLocale();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                {users.length === 0 ? (
                    <p className="text-gray-700">{t('noRecords')}</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('table.name')}</TableHead>
                                <TableHead>{t('table.email')}</TableHead>
                                <TableHead>{t('table.role')}</TableHead>
                                <TableHead>{t('table.date')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                                    <TableCell className="text-gray-700">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                user.role === 'administrador' ? 'info' :
                                                    user.role === 'veterinario' ? 'default' :
                                                        'success'
                                            }
                                        >
                                            {tr(user.role as any)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-700">
                                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString(locale) : tc('notAvailable')}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};
