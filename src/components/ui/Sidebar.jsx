import React from 'react';

export const Sidebar = () => {
    const items = [
        { nombre: 'Panel de Control', icono: 'dashboard', activo: false },
        { nombre: 'Eventos', icono: 'calendar_today', activo: true },
        { nombre: 'Empresas', icono: 'corporate_fare', activo: false },
        { nombre: 'Asistentes', icono: 'groups', activo: false },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/30">
                    <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
                </div>
                <div>
                    <h1 className="text-white font-black text-xl tracking-tighter italic">iMeet!</h1>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Enterprise</p>
                </div>
            </div>

            <nav className="flex-1 px-4 mt-6 space-y-1">
                {items.map((item) => (
                    <a key={item.nombre} href="#" className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${item.activo ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-800 hover:text-white'}`}>
                        <span className="material-symbols-outlined">{item.icono}</span>
                        <span className="text-sm">{item.nombre}</span>
                    </a>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 p-2">
                    <div className="size-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-white">KA</div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">Kathleen Argueta</span>
                        <span className="text-[10px] text-slate-500 font-medium italic">Administradora</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};