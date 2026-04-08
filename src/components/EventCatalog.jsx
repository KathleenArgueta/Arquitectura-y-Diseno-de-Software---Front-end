import React, { useEffect, useState } from 'react';
import { EventCard } from './EventCard';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const EventCatalog = () => {
    const [eventos, setEventos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const { isOrganizer } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('imeet_token');
        fetch('http://localhost:3000/eventos', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                setEventos(Array.isArray(data) ? data : []);
                setCargando(false);
            })
            .catch(() => setCargando(false));
    }, []);

    if (cargando) return <div className="p-10 text-center font-bold text-slate-400">Cargando iMeet!...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Títulos solicitados */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-slate-900">Catalogo de eventos</h1>
                    <p className="text-slate-500 font-medium mt-2">Visualiza los eventos activos y gestiona tu asistencia.</p>
                </div>
                <div className="text-right pb-2">
                    <span className="text-4xl font-black text-blue-600 leading-none">{eventos.length}</span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eventos totales</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.map((evento) => (
                    <EventCard key={evento.event_id} evento={evento} />
                ))}

                {isOrganizer() && (
                    <div
                        onClick={() => navigate('/eventos/nuevo')}
                        className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-10 hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer group"
                    >
                        <span className="material-symbols-outlined text-5xl text-slate-300 group-hover:text-blue-600 mb-4">add_circle</span>
                        <p className="font-bold text-slate-400 group-hover:text-blue-600 uppercase text-xs tracking-widest">Crear Nuevo Evento</p>
                    </div>
                )}
            </div>
        </div>
    );
};