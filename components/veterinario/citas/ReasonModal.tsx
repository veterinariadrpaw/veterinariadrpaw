import { ReasonModalData } from "./types";

interface ReasonModalProps {
    data: ReasonModalData;
    onClose: () => void;
}

export default function ReasonModal({ data, onClose }: ReasonModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Detalles de la Cita
                    </h3>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="space-y-3">
                    <p>
                        <span className="font-medium text-gray-700">
                            Paciente:
                        </span>{" "}
                        {data.pet}
                    </p>

                    <p>
                        <span className="font-medium text-gray-700">
                            Fecha/Hora:
                        </span>{" "}
                        {data.date}
                    </p>

                    <div>
                        <span className="font-medium text-gray-700">
                            Motivo:
                        </span>

                        <p className="mt-1 text-gray-900 whitespace-pre-wrap">
                            {data.reason}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
