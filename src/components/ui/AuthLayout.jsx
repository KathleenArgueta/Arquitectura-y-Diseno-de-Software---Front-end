/**
 * AuthLayout: Layout compartido para todas las pantallas de autenticación.
 * Fondo con degradado azul (primario → oscuro) con patrón geométrico decorativo.
 * La card blanca flota centrada sobre este fondo.
 */
export function AuthLayout({ children }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0056b3 0%, #007BFF 40%, #003d82 100%)',
      }}
    >
      {/* Decoración: círculos difusos de fondo */}
      <div
        className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-[30%] right-[10%] w-48 h-48 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
      />

      {/* Patrón de puntos decorativo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Card container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand encima de la card */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl mb-3 shadow-lg">
            <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">iMeet!</h1>
          <p className="text-blue-200 text-sm mt-0.5">Gestión de Eventos Empresariales</p>
        </div>

        {/* Card blanca */}
        <div
          className="bg-white rounded-2xl shadow-2xl p-8"
          style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)' }}
        >
          {children}
        </div>

        <p className="text-center text-blue-200/60 text-xs mt-6">
          © 2024 iMeet! Corporate Event Management
        </p>
      </div>
    </div>
  );
}
