import { Sidebar } from './components/ui/Sidebar';
import { Header } from './components/ui/Header';
import { EventCatalog } from './components/EventCatalog';
import { EventForm } from './components/EventForm';

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. Barra Lateral Fija */}
      <Sidebar />

      {/* 2. Contenedor Principal */}
      <div className="flex-1 flex flex-col">
        {/* 3. Barra Superior */}
        <Header />

        {/* 4. Contenido Scrolleable */}
        <main className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Aquí puedes alternar entre vistas o mostrar ambas para probar */}
          <section>
            <EventCatalog />
          </section>

          <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <EventForm />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;