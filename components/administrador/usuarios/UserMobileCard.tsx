import { User } from '@/types/user';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface UserMobileCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (id: string) => void;
}

export const UserMobileCard = ({ user, onEdit, onDelete }: UserMobileCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Badge
                    variant={
                        user.role === 'administrador' ? 'info' :
                            user.role === 'veterinario' ? 'default' :
                                'success'
                    }
                >
                    {user.role}
                </Badge>
            </div>

            <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
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
        </div>
    );
};
