import React, { useState } from 'react';

export default function DefinirServicios() {
    const [serviciosCreados, setServiciosCreados] = useState([{
        id: 1,
        nombre: 'Desayuno',
        precio: 3000,
        horaInicio: '06:00',
        horaFin: '10:00',
        sede: 'Sede Central',
        cantidad: 100,
        comentario: 'Servicio de desayuno para empleados'
    },
    {
        id: 2,
        nombre: 'Almuerzo',
        precio: 5000,
        horaInicio: '12:00',
        horaFin: '14:00',
        sede: 'Sucursal 1',
        cantidad: 150,
        comentario: 'Servicio de almuerzo para empleados'
    }, {
        id: 3,
        nombre: 'Once',
        precio: 4000,
        horaInicio: '16:00',
        horaFin: '18:00',
        sede: 'Sucursal 2',
        cantidad: 100,
        comentario: 'Servicio de once para empleados'
    }, {
        id: 4,
        nombre: 'Cena',
        precio: 6000,
        horaInicio: '19:00',
        horaFin: '21:00',
        sede: 'Todas',
        cantidad: 200,
        comentario: 'Servicio de cena para empleados'
    }]);
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [sede, setSede] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [comentario, setComentario] = useState('');

    const generateServicio = (nombre, precio, horaInicio, horaFin, sede, cantidad, comentario) => {
        const nuevoServicio = {
            id: serviciosCreados.length + 1,
            nombre: nombre,
            precio: precio,
            horaInicio: horaInicio,
            horaFin: horaFin,
            sede: sede,
            cantidad: cantidad,
            comentario
        };
        setServiciosCreados([...serviciosCreados, nuevoServicio]);
    };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Definir Servicios</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        if (!nombre || !precio || !horaInicio || !horaFin || !sede || !cantidad) {
                            return;
                        }
                        generateServicio(
                            nombre,
                            precio,
                            horaInicio,
                            horaFin,
                            sede,
                            cantidad,
                            comentario
                        );
                        setNombre('');
                        setPrecio('');
                        setHoraInicio('');
                        setHoraFin('');
                        setSede('');
                        setCantidad('');
                        setComentario('');
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Servicio</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Precio base</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="">Hora inicio</label>
                                <input
                                    type="time"
                                    name="horaInicio"
                                    value={horaInicio}
                                    onChange={e => setHoraInicio(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="">Hora fin</label>
                                <input
                                    type="time"
                                    name="horaFin"
                                    value={horaFin}
                                    onChange={e => setHoraFin(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="sede">Sede</label>
                                <select
                                    name="sede"
                                    id="sede"
                                    value={sede}
                                    onChange={e => setSede(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                >
                                    <option value="">Seleccione sede</option>
                                    <option value="Central">Central</option>
                                    <option value="Sucursal 1">Sucursal 1</option>
                                    <option value="Sucursal 2">Sucursal 2</option>
                                    <option value="Todas">Todas</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="cantidad">Cantidad por turno</label>
                                <input
                                    type="number"
                                    name="cantidad"
                                    id="cantidad"
                                    value={cantidad}
                                    onChange={e => setCantidad(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="estado">Estado</label>
                                <select name="estado" id="estado" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500">
                                    <option value="">Activo</option>
                                    <option value="">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="comentario">Comentario</label>
                                <textarea
                                    id="comentario"
                                    name="comentario"
                                    value={comentario}
                                    onChange={e => setComentario(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!nombre || !precio || !horaInicio || !horaFin || !sede || !cantidad}
                                className={`bg-brand-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${(!nombre || !precio || !horaInicio || !horaFin || !sede || !cantidad) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-blue-700'}`}
                            >
                                Guardar Servicio
                            </button>
                        </div>
                    </form>
                </div>
                <h3 className='text-xl font-semibold text-brand-blue-700 mb-2 mt-6'>Servicios</h3>

                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-brand-blue-500 text-white">
                            <th className="px-4 py-2 border border-gray-300">ID</th>
                            <th className="px-4 py-2 border border-gray-300">Nombre</th>
                            <th className="px-4 py-2 border border-gray-300">Precio</th>
                            <th className="px-4 py-2 border border-gray-300">Rango horario</th>
                            <th className="px-4 py-2 border border-gray-300">Sede</th>
                            <th className="px-4 py-2 border border-gray-300">Cantidad por turno</th>
                            <th className="px-4 py-2">Comentario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {serviciosCreados.map(servicio => (
                            <tr key={servicio.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.id}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.nombre}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">${servicio.precio}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.horaInicio} - {servicio.horaFin}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.sede}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.cantidad}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.comentario  || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};