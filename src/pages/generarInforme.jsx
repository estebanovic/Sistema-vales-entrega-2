import React, { useState, useEffect } from 'react';
import { serviciosAPI, valesAPI } from '../services/api';

export default function GenerarInforme() {
    const [servicios, setServicios] = useState([]);
    const [servicio, setServicio] = useState('');
    const [fecha, setFecha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar servicios al montar
    useEffect(() => {
        loadServicios();
    }, []);

    const loadServicios = async () => {
        try {
            const serviciosData = await serviciosAPI.getAll();
            setServicios(serviciosData);
        } catch (err) {
            setError('Error al cargar servicios: ' + err.message);
        }
    };

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
    const generateInforme = async (servicioId, fecha) => {
        setLoading(true);
        setError('');

        try {
            const semana = seleccionarSemana(fecha);
            
            // Formatear fechas para la API (YYYY-MM-DD)
            const startDate = semana.startOfWeek.toISOString().split('T')[0];
            const endDate = semana.endOfWeek.toISOString().split('T')[0];

            // Obtener vales filtrados del backend
            const response = await valesAPI.getByDateRangeAndService(startDate, endDate, servicioId);
            
            const servicioSeleccionado = servicios.find(s => s._id === servicioId || s.id === servicioId);
            const nombreServicio = servicioSeleccionado?.name || servicioSeleccionado?.nombre || 'N/A';

            // Calcular totales
            const totalVales = response.vales.length;
            const totalCantidad = response.vales.reduce((sum, vale) => sum + vale.cantidad, 0);
            const totalValor = response.vales.reduce((sum, vale) => sum + (vale.valor * vale.cantidad), 0);

            const ventanaImpresion = window.open('', '_blank');
            ventanaImpresion.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Informe de Auditoría de Vales</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .informe-ticket { border: 2px solid #000; padding: 20px; max-width: 800px; margin: 0 auto; }
                        .informe-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
                        .informe-header h2 { margin: 0; color: #e74c3c; }
                        .informe-body { margin-bottom: 15px; }
                        .informe-info p { margin: 8px 0; }
                        .vale-item { padding: 5px 0; border-bottom: 1px solid #eee; }
                        .resumen { background-color: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 5px; }
                        .informe-footer { text-align: center; border-top: 1px solid #000; padding-top: 10px; font-size: 12px; color: #666; margin-top: 20px; }
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
                                <p><strong>Semana:</strong> ${semana.startOfWeek.toLocaleDateString('es-CL', opcionesStringSemana)} - ${semana.endOfWeek.toLocaleDateString('es-CL', opcionesStringSemana)}</p>
                                <p><strong>Servicio:</strong> ${nombreServicio}</p>
                                <p><strong>Fecha de generación:</strong> ${new Date().toLocaleDateString('es-CL', { ...opcionesStringSemana, hour: '2-digit', minute: '2-digit' })}</p>
                                
                                <div class="resumen">
                                    <p><strong>Resumen:</strong></p>
                                    <p>Total de vales emitidos: ${totalVales}</p>
                                    <p>Cantidad total de vales: ${totalCantidad}</p>
                                    <p>Valor total: $${totalValor.toLocaleString('es-CL')}</p>
                                </div>

                                <hr>
                                <p><strong>Detalle de Vales Generados:</strong></p>
                                ${response.vales.length > 0 ? response.vales.map((vale, index) => `
                                    <div class="vale-item">
                                        <p>${index + 1}. <strong>ID:</strong> ${vale.idSeq || vale._id} | 
                                        <strong>Tipo Usuario:</strong> ${vale.tipoUsuario} | 
                                        <strong>Cantidad:</strong> ${vale.cantidad} | 
                                        <strong>Valor:</strong> $${vale.valor.toLocaleString('es-CL')} |
                                        <strong>Fecha:</strong> ${new Date(vale.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        ${vale.observacion ? `<br><em>Obs: ${vale.observacion}</em>` : ''}</p>
                                    </div>
                                `).join('') : '<p>No se encontraron vales para este período y servicio.</p>'}
                                <hr>
                                <p><strong>Observaciones:</strong> ${response.vales.length > 0 ? 'Informe generado correctamente.' : 'No hay vales registrados para el período seleccionado.'}</p>
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
        } catch (err) {
            setError('Error al generar el informe: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Generar Informe de Auditoría de Vales</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        if (!fecha || !servicio) {
                            setError('Por favor complete todos los campos');
                            return;
                        }
                        generateInforme(servicio, fecha);
                        setServicio('');
                        setFecha('');
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="servicio">Servicio</label>
                                <select 
                                    id="servicio" 
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
                                    value={servicio} 
                                    onChange={(e) => setServicio(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Seleccione un servicio</option>
                                    {servicios.map(s => (
                                        <option key={s._id || s.id} value={s._id || s.id}>
                                            {s.name || s.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="fecha">Semana</label>
                                <input 
                                    type="date" 
                                    id="fecha" 
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
                                    value={fecha} 
                                    onChange={(e) => setFecha(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className='flex items-center mt-4 justify-center'>
                            <div>
                                {fecha && fecha !== '' && (
                                    <span className="text-brand-orange-500 font-semibold">
                                        <strong>Semana seleccionada: </strong> 
                                        {seleccionarSemana(fecha).startOfWeek.toLocaleDateString('es-CL', opcionesStringSemana)} - 
                                        {seleccionarSemana(fecha).endOfWeek.toLocaleDateString('es-CL', opcionesStringSemana)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading || !servicio || !fecha}
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${
                                    (loading || !servicio || !fecha) 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-brand-blue-600'
                                }`}
                            >
                                {loading ? 'Generando...' : 'Generar Informe'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}