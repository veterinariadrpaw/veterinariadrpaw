export default function Values() {
    const values = [
        {
            title: "Compasión",
            description: "Tratamos a cada mascota como si fuera nuestra propia familia, con gentileza y empatía.",
            image: "/compacion.jpg",
        },
        {
            title: "Excelencia",
            description: "Nos mantenemos a la vanguardia de la medicina veterinaria para ofrecer los mejores tratamientos.",
            image: "/Excelencia.jpg",
        },
        {
            title: "Integridad",
            description: "Creemos en la transparencia y la honestidad en cada diagnóstico y recomendación.",
            image: "/integridad.jpg",
        },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-teal-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Nuestros Valores</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Lo que nos define
                    </p>
                </div>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                {/* Background Image with Overlay */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${value.image})` }}
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent group-hover:from-teal-900/90 group-hover:via-teal-900/60 transition-all duration-300" />

                                {/* Content */}
                                <div className="relative h-80 flex flex-col justify-end p-8">
                                    <h3 className="text-2xl font-bold text-white mb-3 transform transition-all duration-300 group-hover:scale-105">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-400 text-base leading-relaxed opacity-90">
                                        {value.description}
                                    </p>

                                    {/* Decorative Element */}
                                    <div className="mt-4 w-16 h-1 bg-teal-400 rounded-full transform origin-left transition-all duration-300 group-hover:w-24 group-hover:bg-teal-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
