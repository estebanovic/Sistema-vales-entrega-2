import React, { useState } from 'react';

export default function DefinirVales() {
    const [valesDefinidos, setValesDefinidos] = useState([
        { id: 1, tipoUsuario: 'Funcionario', servicioAlimentacion: 'Almuerzo', valorVale: 5000, cantidadVales: 200, fechaCreacion: '2025-07-01' },
        { id: 2, tipoUsuario: 'Cajero', servicioAlimentacion: 'Desayuno', valorVale: 3000, cantidadVales: 180, fechaCreacion: '2025-09-02' }
    ]);
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [servicioAlimentacion, setServicioAlimentacion] = useState('');
    const [valorVale, setValorVale] = useState('');
    const [cantidadVales, setCantidadVales] = useState('');

    const defineVale = (tipoUsuario, servicioAlimentacion, valorVale, cantidadVales) => {
        const nuevoVale = {
            id: valesDefinidos.length + 1,
            tipoUsuario,
            servicioAlimentacion,
            valorVale,
            fechaCreacion: new Date().toISOString().split('T')[0],
            cantidadVales
        };
        setValesDefinidos([...valesDefinidos, nuevoVale]);
    };

    const deleteVale = (id) => {
        setValesDefinidos(valesDefinidos.filter(vale => vale.id !== id));
    }

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Definir Vales por Tipo de Usuario</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        defineVale(tipoUsuario, servicioAlimentacion, valorVale, cantidadVales);
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="usuario">Tipo de usuario</label>
                                <select id="usuario" className="w-full border border-gray-300 rounded px-3 py-2 mt-1" value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                                    <option value="">Seleccione un tipo de usuario</option>
                                    <option value="Funcionario">Funcionario</option>
                                    <option value="Cajero">Cajero</option>
                                    <option value="Administrador">Administrador</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="servicio">Servicio de alimentación</label>
                                <select id="servicio" className="w-full border border-gray-300 rounded px-3 py-2 mt-1" value={servicioAlimentacion} onChange={(e) => setServicioAlimentacion(e.target.value)}>
                                    <option value="">Seleccione un servicio</option>
                                    <option value="Desayuno">Desayuno</option>
                                    <option value="Almuerzo">Almuerzo</option>
                                    <option value="Once">Once</option>
                                    <option value="Cena">Cena</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="valor">Valor del vale</label>
                                <input type="number" id="valor" className="w-full border border-gray-300 rounded px-3 py-2 mt-1" value={valorVale} onChange={(e) => setValorVale(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="cantidad">Cantidad de vales</label>
                                <input type="number" id="cantidad" className="w-full border border-gray-300 rounded px-3 py-2 mt-1" value={cantidadVales} onChange={(e) => setCantidadVales(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500  ${(!tipoUsuario || !servicioAlimentacion || !valorVale || !cantidadVales) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-blue-600'}`}
                                disabled={!tipoUsuario || !servicioAlimentacion || !valorVale || !cantidadVales}
                            >
                                Definir Vale
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
                            <tr key={vale.id} className="text-center border-b">
                                <td className="px-4 py-2 border border-gray-300">{vale.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.tipoUsuario}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.servicioAlimentacion}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.valorVale}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.cantidadVales}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.fechaCreacion}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button className="text-blue-500 hover:underline hover:cursor-pointer mx-2">Editar</button>
                                    <button className="text-red-500 hover:underline hover:cursor-pointer" onClick={() => deleteVale(vale.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}