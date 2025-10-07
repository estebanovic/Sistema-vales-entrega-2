import React from 'react';



export default function Home() {
  return (
    <div className="px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-brand-blue-700 mb-4">Sistema de Emisión y Control de Vales de Alimentación</h1>
        <p className="text-lg text-gray-800 mb-6">
          Bienvenido al sistema automatizado para la gestión de vales de alimentación de <span className="font-semibold">Ticketmeal S.A.</span>.<br/>
          Gestiona tus vales de desayuno, almuerzo, once y cena de manera rápida y segura, según tu turno y perfil.
        </p>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-brand-blue-700 mb-2">¿Qué puedes hacer aquí?</h2>
          <ul className="list-disc list-inside text-base text-gray-700 space-y-1 pl-4">
            <li>Emisión e impresión de vales personalizada por turno.</li>
            <li>Registro automático de uso y auditoría de vales.</li>
            <li>Informes detallados y gestión de servicios de alimentación.</li>
            <li>Acceso seguro para funcionarios y cajeros.</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          Utiliza el menú superior para navegar por las funcionalidades del sistema.
        </p>
      </div>
    </div>
  );
}