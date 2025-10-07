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

    // Función para generar informe y abrir ventana de impresión
    const generateInforme = (turno, fecha) => {
        const semana = seleccionarSemana(fecha);
        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Informe de Auditoría de Vales</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .informe-ticket { border: 2px solid #000; padding: 20px; max-width: 600px; margin: 0 auto; }
                    .informe-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
                    .informe-header h2 { margin: 0; color: #e74c3c; }
                    .informe-body { margin-bottom: 15px; }
                    .informe-info p { margin: 8px 0; }
                    .informe-footer { text-align: center; border-top: 1px solid #000; padding-top: 10px; font-size: 12px; color: #666; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <div class="informe-ticket">
                    <div class="informe-header">
                        <h2>INFORME DE AUDITORÍA DE VALES</h2>
                    </div>
                    <div class="informe-body">
                        <div class="informe-info">
                            <p><strong>Semana:</strong> ${semana.startOfWeek.toLocaleDateString('es-ES', opcionesStringSemana)} - ${semana.endOfWeek.toLocaleDateString('es-ES', opcionesStringSemana)}</p>
                            <p><strong>Turno:</strong> ${turno}</p>
                            <p><strong>Auditor:</strong> Juan Pérez</p>
                            <hr>
                            <p><strong>Vales Generados:</strong></p>
                            <p>ID: 1 | Usuario: Obrero | Servicio: Almuerzo | Cantidad: 5</p>
                            <p>ID: 2 | Usuario: Administrativo | Servicio: Desayuno | Cantidad: 2</p>
                            <p>ID: 3 | Usuario: Jefe | Servicio: Cena | Cantidad: 1</p>
                            <hr>
                            <p><strong>Observaciones:</strong> Todo correcto, sin incidencias.</p>
                        </div>
                    </div>
                    <div class="informe-footer">
                        <p>Ticketmeal - Sistema de Vales</p>
                        <p>Informe generado automáticamente</p>
                    </div>
                </div>
            </body>
            </html>
        `);
        ventanaImpresion.document.close();
        ventanaImpresion.focus();
        ventanaImpresion.print();
        ventanaImpresion.close();
    };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Generar Informe de Auditoría de Vales</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        if (!fecha || !turno ) {
                            return;
                        }
                        generateInforme(
                            turno,
                            fecha,
                        );
                        // Opcional: limpiar campos después de generar
                        setTurno('');
                        setFecha('');
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