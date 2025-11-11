import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/home'
import ImprimirVales from './pages/imprimirVales'
import DefinirServicios from './pages/definirServicios'
import DefinirVales from './pages/definirVales'
import GenerarInforme from './pages/generarInforme'
import RegistrarVenta from './pages/registrarVenta'
import Login from './pages/login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Ruta pública de login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/*" element={
          <ProtectedRoute>
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/imprimir-vales" element={<ImprimirVales />} />
                <Route path="/definir-servicios" element={<DefinirServicios />} />
                <Route path="/definir-vales" element={<DefinirVales />} />
                <Route path="/generar-informe" element={<GenerarInforme />} />
                <Route path="/registrar-venta" element={<RegistrarVenta />} />
              </Routes>
            </main>
            <Footer />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App