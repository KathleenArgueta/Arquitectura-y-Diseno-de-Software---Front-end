import React, { useEffect, useState } from 'react';
import { EventCard } from './EventCard';

export const EventCatalog = () => {
    const [eventos, setEventos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // GET a la API
        fetch('http://localhost:3000/eventos')
            .then(res => res.json())
            .then(data => {
                setEventos(data);
                setCargando(false);
            })
            .catch(err => {
                console.error("Error cargando eventos:", err);
                setCargando(false);
            });
    }, []);

    if (cargando) return <div className="p-10 text-center font-bold text-slate-400 animate-pulse">Cargando iMeet!...</div>;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900">Catálogo de Eventos</h1>
                    <p className="text-slate-500 font-medium mt-2">Gestiona y descubre las actividades corporativas activas.</p>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-bold text-primary">{eventos.length}</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eventos totales</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.map((evento) => (
                    <EventCard key={evento.event_id} evento={evento} />
                ))}

                {/* Placeholder para crear nuevo */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-10 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-5xl text-slate-300 group-hover:text-primary mb-4 transition-colors">add_circle</span>
                    <p className="font-bold text-slate-500 group-hover:text-primary transition-colors">Nuevo Evento</p>
                </div>
            </div>
        </div>
    );
};