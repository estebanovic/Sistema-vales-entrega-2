import React, { useState, useEffect } from 'react';
import { valesAPI, tipoUsuariosAPI, serviciosAPI } from '../services/api';

export default function ImprimirVales() {
    const [valesGenerados, setValesGenerados] = useState([]);
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [servicioAlimentacion, setServicioAlimentacion] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const [currentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    const [tipoTurno, setTipoTurno] = useState('');

    useEffect(() => {
        if (currentTime >= '06:00' && currentTime < '10:00') {
            setTipoTurno('Desayuno');
        } else if (currentTime >= '12:00' && currentTime < '15:00') {
            setTipoTurno('Almuerzo');
        } else if (currentTime >= '18:00' && currentTime < '20:00') {
            setTipoTurno('Once');
        } else if (currentTime >= '20:00' && currentTime < '23:00') {
            setTipoTurno('Cena');
        } else {
            setTipoTurno('Fuera de horario de vales');
        }
    }, [currentTime]);

    // Cargar datos al montar el componente
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [valesData, tiposData, serviciosData] = await Promise.all([
                valesAPI.getAll(),
                tipoUsuariosAPI.getAll(),
                serviciosAPI.getAll()
            ]);
            
            // Filtrar vales del día actual
            const hoy = new Date().toISOString().split('T')[0];
            const valesHoy = valesData.filter(vale => {
                const fechaVale = new Date(vale.createdAt).toISOString().split('T')[0];
                return fechaVale === hoy;
            });
            
            setValesGenerados(valesHoy);
            setTiposUsuario(tiposData);
            setServicios(serviciosData);
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const generateVale = async (e) => {
        e.preventDefault();
        
        if (!tipoUsuario || !cantidad || !servicioAlimentacion) {
            setError('Por favor complete todos los campos requeridos');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // Buscar el valor del vale según tipo de usuario y servicio
            const tipoUsuarioObj = tiposUsuario.find(t => t._id === tipoUsuario || t.id === tipoUsuario);
            const servicioObj = servicios.find(s => s._id === servicioAlimentacion || s.id === servicioAlimentacion);
            
            const nuevoVale = {
                servicio: servicioAlimentacion,
                tipoUsuario: tipoUsuario,
                valor: servicioObj?.precio || 0,
                cantidad: parseInt(cantidad, 10),
                observaciones: observaciones || ''
            };

            const valeCreado = await valesAPI.create(nuevoVale);
            
            setValesGenerados([valeCreado, ...valesGenerados]);
            setSuccessMessage(`Vale generado exitosamente (${cantidad} vale(s))`);
            
            // Limpiar formulario
            setTipoUsuario('');
            setCantidad('');
            setServicioAlimentacion('');
            setObservaciones('');
            
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Error al generar el vale: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const imprimirVale = (vale) => {
        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write(`
           <!DOCTYPE html>
            <html>
            <head>
                <title>Vale de Alimentación</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .vale-ticket { border: 2px solid #000; padding: 20px; max-width: 400px; margin: 0 auto; }
                    .vale-header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
                    .vale-header h2 { margin: 0; color: #e74c3c; }
                    .numero-vale { font-size: 18px; font-weight: bold; margin: 5px 0; }
                    .id-vale { font-size: 14px; font-weight: bold; margin: 5px 0; color: #666; }
                    .vale-body { margin-bottom: 15px; }
                    .vale-info p { margin: 8px 0; }
                    .vale-footer { text-align: center; border-top: 1px solid #000; padding-top: 10px; font-size: 12px; color: #666; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <div class="vale-ticket">
                <div class="vale-header">
                    <h2>VALE DE ALIMENTACIÓN</h2>
                    <p class="id-vale">ID: ${vale._id}</p>
                </div>
                <div class="vale-body">
                    <div class="vale-info">
                        <p><strong>Fecha:</strong> ${new Date(vale.createdAt).toLocaleDateString('es-CL')}</p>
                        <p><strong>Hora:</strong> ${new Date(vale.createdAt).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p><strong>Tipo:</strong> ${vale.tipoUsuario}</p>
                        <p><strong>Servicio:</strong> ${vale.servicio}</p>
                        <p><strong>Cantidad:</strong> ${vale.cantidad} vale(s)</p>
                        <p><strong>Valor:</strong> $${vale.valor}</p>
                        ${vale.observaciones ? `<p><strong>Observaciones:</strong> ${vale.observaciones}</p>` : ''}
                    </div>
                </div>
                <div class="vale-footer">
                    <p>Ticketmeal - Sistema de Vales</p>
                    <p>Vale válido solo para el servicio indicado</p>
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

    if (loading && valesGenerados.length === 0) {
        return (
            <div className="px-6 py-12">
                <div className="flex justify-center items-center">
                    <div className="text-xl">Cargando...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Generar Vale de Alimentación</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                        {successMessage}
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <h2 className='text-xl font-semibold text-brand-blue-700 mb-2'>Información del turno</h2>
                    <p><strong>Hora actual:</strong> {currentTime}</p>
                    <p><strong>Tipo de turno:</strong> {tipoTurno}</p>
                    <hr className="border-brand-blue-500 m-4"></hr>
                    <form className="space-y-4" onSubmit={generateVale}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="tipoUsuario" className="block text-sm font-medium text-brand-blue-700 mb-1">
                                    Tipo de usuario
                                </label>
                                <select
                                    name="tipoUsuario"
                                    id="tipoUsuario"
                                    value={tipoUsuario}
                                    onChange={e => setTipoUsuario(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    disabled={loading}
                                >
                                    <option value="">Seleccione</option>
                                    {tiposUsuario.map(tipo => (
                                        <option key={tipo._id || tipo.id} value={tipo._id || tipo.id}>
                                            {tipo.name || tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="cantidad" className="block text-sm font-medium text-brand-blue-700 mb-1">
                                    Cantidad de vales
                                </label>
                                <input
                                    type="number"
                                    name="cantidad"
                                    id="cantidad"
                                    min="1"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <label htmlFor="servicioAlimentacion" className="block text-sm font-medium text-brand-blue-700 mb-1">Servicio de alimentación</label>
                                <select
                                    name="servicioAlimentacion"
                                    id="servicioAlimentacion"
                                    value={servicioAlimentacion}
                                    onChange={e => setServicioAlimentacion(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    disabled={loading}
                                >
                                    <option value="">Seleccione</option>
                                    {servicios.map(servicio => (
                                        <option key={servicio._id || servicio.id} value={servicio._id || servicio.id}>
                                            {servicio.name || servicio.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <label htmlFor="observaciones" className="block text-sm font-medium text-brand-blue-700 mb-1">Observaciones (opcional)</label>
                                <textarea
                                    name="observaciones"
                                    id="observaciones"
                                    rows="3"
                                    value={observaciones}
                                    onChange={e => setObservaciones(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    disabled={loading}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading || !tipoUsuario || !cantidad || !servicioAlimentacion}
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${
                                    (loading || !tipoUsuario || !cantidad || !servicioAlimentacion) 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-brand-blue-600'
                                }`}
                            >
                                {loading ? 'Generando...' : 'Generar Vale'}
                            </button>
                        </div>
                    </form>
                </div>
                <h3 className='text-xl font-semibold text-brand-blue-700 mb-2 mt-6'>Vales Generados Hoy</h3>

                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-brand-blue-500 text-white ">
                            <th className="px-4 py-2 border border-gray-300">ID Vale</th>
                            <th className="px-4 py-2 border border-gray-300">Tipo Usuario</th>
                            <th className="px-4 py-2 border border-gray-300">Servicio</th>
                            <th className="px-4 py-2 border border-gray-300">Cantidad</th>
                            <th className="px-4 py-2 border border-gray-300">Valor</th>
                            <th className="px-4 py-2 border border-gray-300">Hora Emisión</th>
                            <th className="px-4 py-2 border border-gray-300">Observaciones</th>
                            <th className="px-4 py-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {valesGenerados.map((vale) => (
                            <tr key={vale._id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-center border border-gray-300">{vale.idSeq}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{vale.tipoUsuario}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{vale.servicio}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{vale.cantidad}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">${vale.valor}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">
                                    {new Date(vale.createdAt).toLocaleTimeString('es-CL', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </td>
                                <td className="px-4 py-2 text-center border border-gray-300">{vale.observaciones || 'N/A'}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">
                                    <button 
                                        className="text-brand-blue-500 hover:underline hover:cursor-pointer" 
                                        onClick={() => imprimirVale(vale)}
                                    >
                                        Imprimir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}