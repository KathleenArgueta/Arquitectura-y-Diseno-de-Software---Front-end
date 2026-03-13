import React, { useState } from 'react';
import { Button } from './ui/Button';

export const EventForm = () => {
    // Mantenemos la misma lógica de estado y backend
    const [formData, setFormData] = useState({
        event_name: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        max_attendanse: '',
        category_id: '',
        company_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            event_name: formData.event_name,
            description: formData.description,
            start_date: formData.start_date,
            end_date: formData.end_date,
            location: formData.location,
            max_attendanse: parseInt(formData.max_attendanse),
            category: { category_id: parseInt(formData.category_id) },
            organizer: { user_id: "4518bfd3-3340-4a2b-be47-f485fae63d7d" },
            company: { company_id: formData.company_id }
        };

        try {
            // Aquí es donde se usa el await
            const response = await fetch('http://localhost:3000/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });

            if (response.ok) {
                alert("¡Éxito! El evento se guardó en la base de datos.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };


    const formContainerStyle = {
        maxWidth: '800px', // Un poco más ancho para las dos columnas
        margin: '40px auto',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '16px', // Bordes más suaves
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)', // Sombra
        border: '1px solid #f0f0f0'
    };

    const sectionTitleStyle = {
        fontSize: '14px',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px'
    };

    const inputGroupStyle = {
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: 'var(--color-texto)',
        fontSize: '14px'
    };

    // Estilo base para inputs
    const inputBaseStyle = {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '8px', //radio intermedio
        border: '1px solid var(--color-borde)',
        backgroundColor: '#fcfcfc', // Fondo gris
        fontSize: '15px',
        fontFamily: 'var(--fuente-principal)',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        outline: 'none' // Quitamos el outline por defecto del navegador
    };

    // Función para manejar el efecto visual al hacer click
    const handleFocus = (e) => {
        e.target.style.borderColor = 'var(--color-primario)';
        e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
        e.target.style.backgroundColor = '#ffffff';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'var(--color-borde)';
        e.target.style.boxShadow = 'none';
        e.target.style.backgroundColor = '#fcfcfc';
    };

    const gridTwoColsStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    };

    return (
        <div style={formContainerStyle}>
            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '10px' }}>
                <h2 style={{ color: 'var(--color-texto)', marginTop: 0, fontSize: '28px', fontWeight: '800' }}>Registrar Evento</h2>
                <p style={{ color: 'var(--color-secundario)', margin: 0, fontSize: '16px' }}>
                    Ingrese la información detallada para la creación del nuevo evento corporativo.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                { }
                <div style={sectionTitleStyle}>1. Información General</div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Nombre Oficial del Evento</label>
                    <input
                        type="text"
                        name="event_name"
                        value={formData.event_name}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={inputBaseStyle}
                        placeholder="Ej. Congreso Anual de Innovación Tecnológica"
                        required
                    />
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Descripción y Objetivos</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={{ ...inputBaseStyle, height: '120px', resize: 'vertical', lineHeight: '1.6' }}
                        placeholder="Describa brevemente el propósito del evento, agenda principal..."
                        required
                    />
                </div>

                <div style={gridTwoColsStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Categoría</label>
                        <select name="category_id" value={formData.category_id} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputBaseStyle} required>
                            <option value="">Seleccione...</option>
                            <option value="1">Tecnología e Innovación</option>
                            <option value="2">Negocios y Finanzas</option>
                        </select>
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Empresa Anfitriona</label>
                        <select name="company_id" value={formData.company_id} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputBaseStyle} required>
                            <option value="">Seleccione...</option>
                            {/* ID de ejemplo basado en la documentación */}
                            <option value="7dd0180e-d2b9-439f-9bb2-6c7e5ea46082">Grupo Theta S.A. de C.V.</option>
                        </select>
                    </div>
                </div>

                { }
                <div style={sectionTitleStyle}>2. Logística y Ubicación</div>

                <div style={gridTwoColsStyle}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Fecha y Hora de Inicio</label>
                        <input
                            type="datetime-local"
                            name="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={inputBaseStyle}
                            required
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Fecha y Hora de Fin</label>
                        <input
                            type="datetime-local"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={inputBaseStyle}
                            required
                        />
                    </div>
                </div>

                <div style={{ ...gridTwoColsStyle, gridTemplateColumns: '2fr 1fr' }}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Dirección o Sede</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={inputBaseStyle}
                            placeholder="Ej. Hotel Sheraton, Salón Grand Magnolio"
                            required
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Aforo Máximo</label>
                        <input
                            type="number"
                            name="max_attendanse"
                            value={formData.max_attendanse}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            style={inputBaseStyle}
                            min="1"
                            placeholder="Ej. 150"
                            required
                        />
                    </div>
                </div>

                { }
                <div style={{
                    marginTop: '40px',
                    paddingTop: '20px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '15px'
                }}>
                    <Button type="button" variant="secondary">Cancelar</Button>
                    <Button type="submit" variant="primary">Finalizar Registro</Button>
                </div>

            </form>
        </div>
    );
};