import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export const EventForm = () => {
    // --- NUEVO: Estado para las categorías reales ---
    const [categories, setCategories] = useState([]);

    const [formData, setFormData] = useState({
        event_name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        max_attendanse: '',
        category_id: '',
        company_id: '7dd0180e-d2b9-439f-9bb2-6c7e5ea46082' // Grupo Theta
    });

    // --- NUEVO: Cargar categorías del Backend ---
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await fetch('http://localhost:3000/categorias');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error("Error al obtener categorías dinámicas:", err);
            }
        };
        loadCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            event_name: formData.event_name,
            description: formData.description,
            start_date: new Date(formData.start_date).toISOString(),
            end_date: new Date(formData.end_date).toISOString(),
            location: formData.location,
            max_attendanse: parseInt(formData.max_attendanse),
            category: { category_id: parseInt(formData.category_id) },
            organizer: { user_id: "4518bfd3-3340-4a2b-be47-f485fae63d7d" },
            company: { company_id: formData.company_id }
        };

        try {
            const res = await fetch('http://localhost:3000/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert("¡iMeet! registró el evento con éxito!");
                setFormData({ ...formData, event_name: '', description: '', start_date: '', end_date: '', location: '', max_attendanse: '', category_id: '' });
            }
        } catch (err) {
            console.error("Error al conectar con la API:", err);
        }
    };

    // Clases constantes para mantener el diseño pro
    const labelClass = "block text-[11px] font-extrabold uppercase text-slate-400 mb-2 tracking-wider";
    const inputClass = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-300 text-sm";
    const sectionTitle = "text-[13px] text-primary font-bold uppercase tracking-widest mb-6 pb-2 border-b border-slate-100 flex items-center gap-2";

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-sm border border-slate-100">
            <header className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Registrar Evento</h2>
                <p className="text-slate-500 font-medium">Configura los detalles del próximo encuentro en iMeet!</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-10">

                {/* SECCIÓN 1: INFORMACIÓN GENERAL */}
                <section>
                    <h3 className={sectionTitle}>
                        <span className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                        Información General
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className={labelClass}>Nombre Oficial del Evento</label>
                            <input name="event_name" value={formData.event_name} onChange={handleChange} className={inputClass} placeholder="Ej. Tech Summit 2026" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>Descripción y Objetivos</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className={`${inputClass} h-28 resize-none`} placeholder="Describe el propósito del evento..." required />
                        </div>

                        <div>
                            <label className={labelClass}>Categoría</label>
                            <select
                                name="category_id"
                                value={formData.category_id}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Seleccione una categoría...</option>
                                {/* --- DINÁMICO: Aquí se cargan tus categorías --- */}
                                {categories.map((cat) => (
                                    <option key={cat.category_id} value={cat.category_id}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Empresa Anfitriona</label>
                            <select name="company_id" value={formData.company_id} onChange={handleChange} className={inputClass} required>
                                <option value="7dd0180e-d2b9-439f-9bb2-6c7e5ea46082">Grupo Theta S.A. de C.V.</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: LOGÍSTICA Y UBICACIÓN */}
                <section>
                    <h3 className={sectionTitle}>
                        <span className="size-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                        Logística y Ubicación
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Fecha y Hora de Inicio</label>
                            <input type="datetime-local" name="start_date" value={formData.start_date} onChange={handleChange} className={inputClass} required />
                        </div>

                        <div>
                            <label className={labelClass}>Fecha y Hora de Fin</label>
                            <input type="datetime-local" name="end_date" value={formData.end_date} onChange={handleChange} className={inputClass} required />
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClass}>Dirección o Sede</label>
                                <input name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Ej. Hotel Sheraton" required />
                            </div>
                            <div>
                                <label className={labelClass}>Aforo Máximo</label>
                                <input type="number" name="max_attendanse" value={formData.max_attendanse} onChange={handleChange} className={inputClass} placeholder="0" required />
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="pt-6 border-t border-slate-50 flex justify-end gap-4">
                    <Button variant="secondary">Cancelar</Button>
                    <Button type="submit">Finalizar Registro</Button>
                </footer>
            </form>
        </div>
    );
};