import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

import { Sidebar } from './components/ui/Sidebar';
import { Header } from './components/ui/Header';
import { EventCatalog } from './components/EventCatalog';
import { EventForm } from './components/EventForm';
import { CategoryManager } from './components/CategoryManager';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';

function MainLayout() {
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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainLayout />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;