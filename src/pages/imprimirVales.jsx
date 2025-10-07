import React, { useState } from 'react';

function ImprimirVales() {
    const [valesGenerados, setValesGenerados] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [servicioAlimentacion, setServicioAlimentacion] = useState('');
    const [observaciones, setObservaciones] = useState('');

    let currentTime = new Date();
    currentTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    let tipoTurno = '';
    if (currentTime >= '06:00' && currentTime < '10:00') {
        tipoTurno = 'Desayuno';
    } else if (currentTime >= '12:00' && currentTime < '15:00') {
        tipoTurno = 'Almuerzo';
    } else if (currentTime >= '18:00' && currentTime < '20:00') {
        tipoTurno = 'Once';
    } else if (currentTime >= '20:00' && currentTime < '23:00') {
        tipoTurno = 'Cena';
    } else {
        tipoTurno = 'Fuera de horario de vales';
    }

    const generateVale = (tipoUsuario, cantidad, servicioAlimentacion, observaciones) => {
        const nuevoVale = {
            id: valesGenerados.length + 1,
            tipoUsuario,
            cantidad: parseInt(cantidad, 10),
            servicioAlimentacion,
            observaciones,
            horaEmision: currentTime
        };
        setValesGenerados([...valesGenerados, nuevoVale]);
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
                    <p class="id-vale">ID: ${vale.id}</p>
                </div>
                <div class="vale-body">
                    <div class="vale-info">
                        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
                        <p><strong>Hora:</strong> ${vale.horaEmision}</p>
                        <p><strong>Tipo:</strong> ${vale.tipoUsuario}</p>
                        <p><strong>Servicio:</strong> ${vale.servicio}</p>
                        <p><strong>Cantidad:</strong> ${vale.cantidad} vale(s)</p>
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

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Generar Vale de Alimentación</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <h2 className='text-xl font-semibold text-brand-blue-700 mb-2'>Información del turno</h2>
                    <p><strong>Hora actual:</strong> {currentTime}</p>
                    <p><strong>Tipo de turno:</strong> {tipoTurno}</p>
                    <hr className="border-brand-blue-500 m-4"></hr>
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        if (!tipoUsuario || !cantidad || !servicioAlimentacion) {
                            return;
                        }
                        generateVale(
                            tipoUsuario,
                            cantidad,
                            servicioAlimentacion,
                            observaciones
                        );
                        // Opcional: limpiar campos después de generar
                        setTipoUsuario('');
                        setCantidad('');
                        setServicioAlimentacion('');
                        setObservaciones('');
                    }}>
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
                                >
                                    <option value="">Seleccione</option>
                                    <option value="obrero">Obrero</option>
                                    <option value="administrativo">Administrativo</option>
                                    <option value="jefe">Jefe</option>
                                    <option value="gerente">Gerente</option>
                                    <option value="visita">Visita</option>
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
                                >
                                    <option value="">Seleccione</option>
                                    <option value="desayuno">Desayuno</option>
                                    <option value="almuerzo">Almuerzo</option>
                                    <option value="once">Once</option>
                                    <option value="cena">Cena</option>
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
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!tipoUsuario || !cantidad || !servicioAlimentacion}
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${(!tipoUsuario || !cantidad || !servicioAlimentacion) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-blue-600'}`}
                            >
                                Generar Vale
                            </button>
                        </div>
                    </form>
                </div>
                <h3 className='text-xl font-semibold text-brand-blue-700 mb-2 mt-6'>Vales Generados Hoy</h3>

                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-brand-blue-500 text-white">
                            <th className="px-4 py-2">ID Vale</th>
                            <th className="px-4 py-2">Tipo Usuario</th>
                            <th className="px-4 py-2">Cantidad</th>
                            <th className="px-4 py-2">Servicio</th>
                            <th className="px-4 py-2">Hora Emisión</th>
                            <th className="px-4 py-2">Observaciones</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {valesGenerados.map((vale) => (
                            <tr key={vale.id} className="border-b hover:bg-gray-100">
                                <td className="px-4 py-2 text-center">{vale.id}</td>
                                <td className="px-4 py-2 text-center">{vale.tipoUsuario}</td>
                                <td className="px-4 py-2 text-center">{vale.cantidad}</td>
                                <td className="px-4 py-2 text-center">{vale.servicioAlimentacion}</td>
                                <td className="px-4 py-2 text-center">{vale.horaEmision}</td>
                                <td className="px-4 py-2 text-center">{vale.observaciones || 'N/A'}</td>
                                <td className="px-4 py-2 text-center">
                                    <button className="text-brand-blue-500 hover:underline hover:cursor-pointer" onClick={() => imprimirVale(vale)}>Imprimir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}
export default ImprimirVales;