import { Button } from '@/components/ui/Button';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface RoleMobileCardProps {
    user: User;
    modifiedRole: string;
    onRoleChange: (userId: string, newRole: string) => void;
    onSave: (userId: string) => void;
}

export const RoleMobileCard = ({ user, modifiedRole, onRoleChange, onSave }: RoleMobileCardProps) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="mb-3">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">Rol Actual</span>
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full w-fit ${user.role === 'administrador' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'veterinario' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {user.role}
                    </span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 mb-1">Nuevo Rol</span>
                    <select
                        value={modifiedRole}
                        onChange={(e) => onRoleChange(user._id, e.target.value)}
                        className="block w-32 pl-2 pr-8 py-1 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md border text-black"
                    >
                        <option value="cliente">Cliente</option>
                        <option value="veterinario">Veterinario</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>
            </div>

            {modifiedRole !== user.role && (
                <div className="mt-4 flex justify-end">
                    <Button
                        size="sm"
                        onClick={() => onSave(user._id)}
                        className="bg-indigo-600 text-white hover:bg-indigo-700 w-full justify-center"
                    >
                        Actualizar Rol
                    </Button>
                </div>
            )}
        </div>
    );
};
