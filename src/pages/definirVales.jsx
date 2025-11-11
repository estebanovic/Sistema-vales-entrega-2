import React, { useState, useEffect } from 'react';
import { valesAPI, serviciosAPI, tipoUsuariosAPI } from '../services/api';

export default function DefinirVales() {
    const [valesDefinidos, setValesDefinidos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [tiposUsuario, setTiposUsuario] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // Estados del formulario
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [servicioAlimentacion, setServicioAlimentacion] = useState('');
    const [valorVale, setValorVale] = useState('');
    const [cantidadVales, setCantidadVales] = useState('');

    // Cargar datos al montar el componente
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [valesData, serviciosData, tiposData] = await Promise.all([
                valesAPI.getAll(),
                serviciosAPI.getAll(),
                tipoUsuariosAPI.getAll()
            ]);
            setValesDefinidos(valesData);
            setServicios(serviciosData);
            setTiposUsuario(tiposData);
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const defineVale = async (e) => {
        e.preventDefault();
        
        if (!tipoUsuario || !servicioAlimentacion || !valorVale || !cantidadVales) {
            setError('Por favor complete todos los campos');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const nuevoVale = {
                servicio: servicioAlimentacion,
                tipoUsuario: tipoUsuario,
                valor: parseFloat(valorVale),
                cantidad: parseInt(cantidadVales)
            };

            const valeCreado = await valesAPI.create(nuevoVale);
            
            setValesDefinidos([...valesDefinidos, valeCreado]);
            setSuccessMessage('Vale definido exitosamente');
            
            // Limpiar formulario
            setTipoUsuario('');
            setServicioAlimentacion('');
            setValorVale('');
            setCantidadVales('');
            
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Error al definir el vale: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteVale = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este vale?')) {
            return;
        }

        try {
            await valesAPI.delete(id);
            
            setValesDefinidos(valesDefinidos.filter(vale => vale._id !== id));
            setSuccessMessage('Vale eliminado exitosamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Error al eliminar el vale: ' + err.message);
        }
    };

    if (loading && valesDefinidos.length === 0) {
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
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Definir Vales por Tipo de Usuario</h1>
                
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
                    <form className="space-y-4" onSubmit={defineVale}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="usuario">Tipo de usuario</label>
                                <select 
                                    id="usuario" 
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
                                    value={tipoUsuario} 
                                    onChange={(e) => setTipoUsuario(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Seleccione un tipo de usuario</option>
                                    {tiposUsuario.map(tipo => (
                                        <option key={tipo._id || tipo.id} value={tipo._id || tipo.id}>
                                            {tipo.name || tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="servicio">Servicio de alimentación</label>
                                <select 
                                    id="servicio" 
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
                                    value={servicioAlimentacion} 
                                    onChange={(e) => setServicioAlimentacion(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Seleccione un servicio</option>
                                    {servicios.map(servicio => (
                                        <option key={servicio._id || servicio.id} value={servicio._id || servicio.id}>
                                            {servicio.name || servicio.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="valor">Valor del vale</label>
                                <input 
                                    type="number" 
                                    id="valor" 
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
                                    value={valorVale} 
                                    onChange={(e) => setValorVale(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label htmlFor="cantidad">Cantidad de vales</label>
                                <input 
                                    type="number" 
                                    id="cantidad" 
                                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1" 
                                    value={cantidadVales} 
                                    onChange={(e) => setCantidadVales(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500  ${
                                    (loading || !tipoUsuario || !servicioAlimentacion || !valorVale || !cantidadVales) 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-brand-blue-600'
                                }`}
                                disabled={loading || !tipoUsuario || !servicioAlimentacion || !valorVale || !cantidadVales}
                            >
                                {loading ? 'Definiendo...' : 'Definir Vale'}
                            </button>
                        </div>
                    </form>
                </div>
                <h3 className='text-xl font-semibold text-brand-blue-700 mb-2 mt-6'>Vales Definidos</h3>

                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-brand-blue-500 text-white">
                            <th className="px-4 py-2 border border-gray-300">ID</th>
                            <th className="px-4 py-2 border border-gray-300">Tipo de usuario</th>
                            <th className="px-4 py-2 border border-gray-300">Servicio</th>
                            <th className="px-4 py-2 border border-gray-300">Valor</th>
                            <th className="px-4 py-2 border border-gray-300">Cantidad</th>
                            <th className="px-4 py-2 border border-gray-300">Fecha creación</th>
                            <th className="px-4 py-2 border border-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {valesDefinidos.map((vale) => (
                            <tr key={vale._id} className="text-center border-b">
                                <td className="px-4 py-2 border border-gray-300">{vale.idSeq}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.tipoUsuario}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.servicio}</td>
                                <td className="px-4 py-2 border border-gray-300">${vale.valor}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.cantidad}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {new Date(vale.createdAt).toLocaleDateString('es-CL')}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    
                                    <button 
                                        className="text-red-500 hover:underline hover:cursor-pointer" 
                                        onClick={() => deleteVale(vale._id)}
                                    >
                                        Eliminar
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