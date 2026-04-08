import React, { useState, useEffect } from 'react';

export const EventCard = ({ evento }) => {
    // Estados para el giro y la confirmación
    const [isFlipped, setIsFlipped] = useState(false);
    const [yaInscrito, setYaInscrito] = useState(evento.user_asiste || false);
    const [timeLeft, setTimeLeft] = useState("");

    // Cálculo de la cuenta regresiva para la cara B
    useEffect(() => {
        const calculateTime = () => {
            const diff = new Date(evento.start_date) - new Date();
            if (diff <= 0) return "En curso";
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            return `${days}d ${hours}h`;
        };
        setTimeLeft(calculateTime());

        // Actualizamos cada minuto
        const timer = setInterval(() => setTimeLeft(calculateTime()), 60000);
        return () => clearInterval(timer);
    }, [evento.start_date]);

    // Función principal para registrar asistencia en NestJS
    const handleAsistencia = async (e) => {
        e.stopPropagation(); // Evita que la carta gire al presionar el botón

        if (yaInscrito) return;

        const token = localStorage.getItem('imeet_token');
        if (!token) {
            console.error("No se encontró sesión activa.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/registros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ event_id: evento.event_id })
            });

            if (response.ok || response.status === 409) {
                // Si se crea (201) o ya existía (409 Conflict), marcamos como inscrito
                setYaInscrito(true);
            }
        } catch (error) {
            console.error("Error de conexión con el servidor:", error);
        }
    };

    // Formateo de fecha para el badge superior
    const fecha = new Date(evento.start_date);
    const mes = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
    const dia = fecha.getDate();

    // Link dinámico para Google Maps (Cara B)
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(evento.location)}`;

    return (
        <div className="h-[520px] [perspective:1000px]">
            <div className={`relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

                {/* --- LADO A: FRENTE (Catálogo Limpio) --- */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 h-full flex flex-col overflow-hidden">

                        {/* Banner e Imagen */}
                        <div className="relative h-48 bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop"
                                alt="banner" className="w-full h-full object-cover"
                            />
                            {/* Badge de Fecha Flotante */}
                            <div className="absolute top-4 left-4 bg-white rounded-xl p-2 px-3 text-center shadow-md">
                                <p className="text-[10px] font-black text-blue-600 leading-none">{mes}</p>
                                <p className="text-xl font-black text-slate-800 leading-none">{dia}</p>
                            </div>
                        </div>

                        {/* Contenido Principal */}
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-extrabold text-slate-900 leading-tight mb-4">{evento.event_name}</h3>

                            {/* Ubicación (Solo Nombre) */}
                            <div className="flex items-center gap-2 text-slate-400 mb-6">
                                <span className="material-symbols-outlined text-lg">location_on</span>
                                <span className="text-xs font-bold truncate">{evento.location}</span>
                            </div>

                            {/* Sección Inferior: Progreso y Botones */}
                            <div className="mt-auto">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                                    <span className={yaInscrito ? "text-blue-600 font-black" : "text-slate-400"}>
                                        {yaInscrito ? "Asistencia confirmada" : "Asistencia"}
                                    </span>
                                    <span className="text-blue-600 font-black">{yaInscrito ? '151' : '150'} / {evento.max_attendanse}</span>
                                </div>

                                {/* Barra de Progreso */}
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-1000 ${yaInscrito ? 'bg-blue-400' : 'bg-blue-600'}`} style={{ width: '65%' }}></div>
                                </div>

                                <div className="flex justify-between items-center mt-6">
                                    <button
                                        onClick={() => setIsFlipped(true)}
                                        className="text-blue-600 text-xs font-black hover:underline tracking-tight"
                                    >
                                        Ver Detalles
                                    </button>

                                    <button
                                        onClick={handleAsistencia}
                                        disabled={yaInscrito}
                                        className={`px-6 py-3 rounded-xl font-black text-[11px] uppercase transition-all flex items-center gap-2 ${yaInscrito
                                            ? 'bg-blue-50 text-blue-600 border border-blue-100 cursor-default shadow-none'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100'
                                            }`}
                                    >
                                        {yaInscrito && <span className="material-symbols-outlined text-sm">check_circle</span>}
                                        {yaInscrito ? 'Asistencia confirmada' : 'Confirmar asistencia'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- LADO B: ATRÁS (Logística e Interacción) --- */}
                <div className="absolute inset-0 h-full w-full rounded-[2.5rem] bg-slate-900 text-white p-10 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-blue-500 font-black uppercase text-[10px] tracking-[0.3em]">Logística iMeet!</span>
                                <button onClick={() => setIsFlipped(false)} className="material-symbols-outlined text-slate-500 hover:text-white transition-colors">close</button>
                            </div>

                            <div className="space-y-6">
                                {/* Dirección con Link a Maps */}
                                <div>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Dirección Exacta</p>
                                    <a
                                        href={mapsLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-bold text-white hover:text-blue-400 underline decoration-slate-700 flex items-center gap-2 transition-colors group"
                                    >
                                        {evento.location}
                                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                                    </a>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Fecha / Hora</p>
                                        <p className="text-sm font-bold">{new Date(evento.start_date).toLocaleDateString()}</p>
                                        <p className="text-xs text-slate-400">{new Date(evento.start_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Inicia en</p>
                                        <p className="text-lg font-black italic text-blue-500">{timeLeft}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Aforo Máximo</p>
                                    <p className="text-sm font-bold">{evento.max_attendanse} Personas</p>
                                </div>
                            </div>
                        </div>

                        {/* Botón Volver */}
                        <button
                            onClick={() => setIsFlipped(false)}
                            className="w-full py-4 border border-slate-700 rounded-2xl font-black text-[10px] uppercase hover:bg-white hover:text-slate-900 transition-all tracking-widest"
                        >
                            Regresar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};