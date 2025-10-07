import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ImprimirVales from './pages/imprimirVales'
import DefinirServicios from './pages/definirServicios'
import DefinirVales from './pages/definirVales'
import GenerarInforme from './pages/generarInforme'
import RegistrarVenta from './pages/registrarVenta'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
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
      </BrowserRouter>
      <Footer />
    </div>
  )
}


export default App
