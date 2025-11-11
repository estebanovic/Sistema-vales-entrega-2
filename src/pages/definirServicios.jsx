import React, { useState, useEffect } from 'react';
import { serviciosAPI, sedesAPI } from '../services/api';

export default function DefinirServicios() {
    const [serviciosCreados, setServiciosCreados] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [sede, setSede] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [estado, setEstado] = useState('activo');
    const [comentario, setComentario] = useState('');

    // Cargar servicios y sedes al montar el componente
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [serviciosData, sedesData] = await Promise.all([
                serviciosAPI.getAll(),
                sedesAPI.getAll()
            ]);
            setServiciosCreados(serviciosData);
            setSedes(sedesData);
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !precio || !horaInicio || !horaFin || !sede || !cantidad) {
            setError('Por favor complete todos los campos requeridos');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const nuevoServicio = {
                nombre,
                precio: parseFloat(precio),
                horaInicio,
                horaFin,
                sede,
                cantidad: parseInt(cantidad),
                estado,
                comentario
            };

            const servicioCreado = await serviciosAPI.create(nuevoServicio);

            setServiciosCreados([...serviciosCreados, servicioCreado]);
            setSuccessMessage('Servicio creado exitosamente');

            // Limpiar formulario
            setNombre('');
            setPrecio('');
            setHoraInicio('');
            setHoraFin('');
            setSede('');
            setCantidad('');
            setEstado('activo');
            setComentario('');

            // Ocultar mensaje después de 3 segundos
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Error al crear el servicio: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && serviciosCreados.length === 0) {
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
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Definir Servicios</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {successMessage}
                    </div>
                )}

                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Servicio</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
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
                                    disabled={loading}
                                >
                                    <option value="">Seleccione sede</option>
                                    {sedes.map(s => (
                                        <option key={s._id} value={s._id}>
                                            {s.name}
                                        </option>
                                    ))}
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
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="estado">Estado</label>
                                <select
                                    name="estado"
                                    id="estado"
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    disabled={loading}
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
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
                                    disabled={loading}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading || !nombre || !precio || !horaInicio || !horaFin || !sede || !cantidad}
                                className={`bg-brand-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${(loading || !nombre || !precio || !horaInicio || !horaFin || !sede || !cantidad)
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-brand-blue-700'
                                    }`}
                            >
                                {loading ? 'Guardando...' : 'Guardar Servicio'}
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
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.idSeq}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.nombre}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">${servicio.precio}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.horaInicio} - {servicio.horaFin}</td>
                                <td className="px-4 py-2 text-center border border-gray-300">
                                    {sedes.find(s => s.id === servicio.sedeId)?.nombre || servicio.sede || 'N/A'}
                                </td>
                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.cantidad}</td>

                                <td className="px-4 py-2 text-center border border-gray-300">{servicio.comentario || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};