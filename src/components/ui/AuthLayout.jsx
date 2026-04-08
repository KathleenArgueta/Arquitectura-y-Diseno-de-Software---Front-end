export function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#f8fafc]">

      { }
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Contenedor Principal */}
      <div className="relative z-10 w-full max-w-[90%] md:max-w-md lg:max-w-lg transition-all duration-300">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 justify-center">
            <div className="size-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic">iMeet!</h1>
              <p className="text-[11px] text-primary font-bold uppercase tracking-widest leading-none mt-1">Enterprise</p>
            </div>
          </div>
        </div>

        {/* Tarjeta con efecto*/}
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 md:p-10">
          {children}
        </div>

        {/* Footer del login */}
        <p className="text-center text-slate-400 text-xs mt-8 font-medium">
          © 2026 iMeet! Enterprise. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
