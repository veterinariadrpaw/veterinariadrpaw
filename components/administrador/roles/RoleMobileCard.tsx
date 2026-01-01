import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

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
    const t = useTranslations('AdminDashboard.roles');
    const tr = useTranslations('AdminDashboard.roleLabels');

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="mb-3">
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-700 font-bold">{user.email}</p>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-700 mb-1 font-bold">{t('table.currentRole')}</span>
                    <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-bold rounded-full w-fit ${user.role === 'administrador' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'veterinario' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {tr(user.role as any)}
                    </span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-700 mb-1 font-bold">{t('table.newRole')}</span>
                    <select
                        value={modifiedRole}
                        onChange={(e) => onRoleChange(user._id, e.target.value)}
                        className="block w-32 pl-2 pr-8 py-1 text-sm font-bold border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md border text-black"
                    >
                        <option value="cliente">{tr('cliente')}</option>
                        <option value="veterinario">{tr('veterinario')}</option>
                        <option value="administrador">{tr('administrador')}</option>
                    </select>
                </div>
            </div>

            {modifiedRole !== user.role && (
                <div className="mt-4 flex justify-end">
                    <Button
                        size="sm"
                        onClick={() => onSave(user._id)}
                        className="bg-indigo-600 text-white hover:bg-indigo-700 w-full justify-center font-bold"
                    >
                        {t('updateRole')}
                    </Button>
                </div>
            )}
        </div>
    );
};
