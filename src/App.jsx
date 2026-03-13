import { Sidebar } from './components/ui/Sidebar';
import { Header } from './components/ui/Header';
import { EventCatalog } from './components/EventCatalog';
import { EventForm } from './components/EventForm';
import { CategoryManager } from './components/CategoryManager';

function App() {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 space-y-16">
          <section id="catalogo">
            <EventCatalog />
          </section>

          <section id="crear-evento">
            <EventForm />
          </section>

          <section id="categorias" className="pb-20">
            <CategoryManager />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;