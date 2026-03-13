import React, { useEffect, useState } from 'react';
import { EventCard } from './EventCard';

export const EventCatalog = () => {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        // Función para traer los eventos reales del backend de NestJS
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:3000/eventos');
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                console.error("Error al obtener eventos del servidor:", error);
            }
        };

        fetchEvents();
    }, []); // El array vacío asegura que solo se ejecute una vez al cargar

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Encabezado Estilo IA */}
            <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Event Catalog</h1>
                <p className="text-slate-500">Manage and discover upcoming corporate events across all branches.</p>
            </div>

            {/* Grid de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventos.map((evento) => (
                    <EventCard key={evento.event_id || evento.id} evento={evento} />
                ))}

                {/* Placeholder "Crear Nuevo" de la guía IA */}
                <div className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-8 gap-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                    <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-4xl font-bold">add</span>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-slate-700">Create New Event</h3>
                        <p className="text-sm text-slate-500">Add a custom event to the catalog</p>
                    </div>
                </div>
            </div>
        </div>
    );
};