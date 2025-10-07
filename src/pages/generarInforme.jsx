import React, { useState } from 'react';

export default function GenerarInforme() {
    const [turno, setTurno] = useState('');
    const [fecha, setFecha] = useState('');

    const seleccionarSemana = (fecha) => {
        const selectedDate = new Date(fecha);
        const day = selectedDate.getDay();
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - day);
        const endOfWeek = new Date(selectedDate);
        endOfWeek.setDate(selectedDate.getDate() + (6 - day));
        return { startOfWeek, endOfWeek };
    };
    const opcionesStringSemana = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Generar Informe de Auditoría de Vales</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={(e) => {
                      
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="turno">Turno</label>
                                <select id="turno" className="w-full border border-gray-300 rounded px-3 py-2 mt-1" value={turno} onChange={(e) => setTurno(e.target.value)}>
                                    <option value="">Seleccione un turno</option>
                                    <option value="Mañana">Mañana (06:00 - 14:00)</option>
                                    <option value="Tarde">Tarde (14:00 - 22:00)</option>
                                    <option value="Noche">Noche (22:00 - 06:00)</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="fecha">Semana</label>
                                <input type="date" id="fecha" className="w-full border border-gray-300 rounded px-3 py-2 mt-1" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex items-center mt-4 justify-center'>
                            <div>
                                {fecha && fecha !== '' && (
                                    <span className="text-brand-orange-500 font-semibold">
                                        <strong>Semana seleccionada: </strong> { seleccionarSemana(fecha).startOfWeek.toLocaleDateString('es-ES',opcionesStringSemana)} - {seleccionarSemana(fecha).endOfWeek.toLocaleDateString('es-ES',opcionesStringSemana)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!turno || !fecha}
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${(!turno || !fecha) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-blue-600'}`}
                            >
                                Generar Informe
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}