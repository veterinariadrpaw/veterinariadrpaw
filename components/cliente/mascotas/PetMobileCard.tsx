import { Pet } from '@/types/pet';
import { Button } from '@/components/ui/Button';

interface PetMobileCardProps {
    pet: Pet;
    onEdit: (pet: Pet) => void;
    onDelete: (id: string) => void;
}

export const PetMobileCard = ({ pet, onEdit, onDelete }: PetMobileCardProps) => {
    const getSpeciesEmoji = (especie: string) => {
        const especieLower = especie.toLowerCase();
        if (especieLower.includes('perro')) return '🐕';
        if (especieLower.includes('gato')) return '🐈';
        return '🐾';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="text-4xl">{getSpeciesEmoji(pet.especie)}</div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{pet.nombre}</h3>
                        <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
                            {pet.especie}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Raza:</strong> {pet.raza}</p>
                {pet.sexo && <p><strong>Sexo:</strong> {pet.sexo}</p>}
                {pet.edad !== undefined && <p><strong>Edad:</strong> {pet.edad} años</p>}
                {pet.peso && <p><strong>Peso:</strong> {pet.peso} kg</p>}
                {pet.color && <p><strong>Color:</strong> {pet.color}</p>}
                {pet.esterilizado && <p className="text-blue-600">✓ Esterilizado</p>}
                {pet.alergias && pet.alergias.length > 0 && (
                    <p className="text-red-600"><strong>Alergias:</strong> {pet.alergias.join(", ")}</p>
                )}
            </div>

            <div className="mt-4 flex justify-end space-x-2 border-t pt-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(pet)}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    Editar
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(pet._id)}
                    className="text-red-600 hover:text-red-800"
                >
                    Eliminar
                </Button>
            </div>
        </div>
    );
};
