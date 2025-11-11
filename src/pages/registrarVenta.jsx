import React, { useState, useEffect } from 'react';
import { serviciosAPI, ticketsAPI, usersAPI } from '../services/api';

export default function RegistrarVenta() {
    const [ticketsRegistrados, setTicketsRegistrados] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // Estados del formulario
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [tipoTicket, setTipoTicket] = useState('');
    const [item, setItem] = useState('');
    const [valor, setValor] = useState('');

    // Cargar datos al montar el componente
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [ticketsData, serviciosData, tiposData] = await Promise.all([
                ticketsAPI.getAll(),
                serviciosAPI.getAll(),
                usersAPI.getAll()
            ]);
            setTicketsRegistrados(ticketsData);
            setServicios(serviciosData);
            setUsuarios(tiposData);
        } catch (err) {
            setError('Error al cargar los datos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const registerTicket = async (e) => {
        e.preventDefault();
        
        if (!fecha || !hora || !idUsuario || !tipoTicket || !item || !valor) {
            setError('Por favor complete todos los campos');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            // Combinar fecha y hora en formato ISO
            const fechaCompleta = new Date(`${fecha}T${hora}`).toISOString();
            
            const nuevoTicket = {
                fecha: fechaCompleta,
                usuario: idUsuario,
                servicio: tipoTicket,
                item: item,
                total: parseFloat(valor)
            };

            const ticketCreado = await ticketsAPI.create(nuevoTicket);
            
            setTicketsRegistrados([...ticketsRegistrados, ticketCreado]);
            setSuccessMessage('Ticket registrado exitosamente');
            
            // Limpiar formulario
            setFecha('');
            setHora('');
            setIdUsuario('');
            setTipoTicket('');
            setItem('');
            setValor('');
            
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError('Error al registrar el ticket: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && ticketsRegistrados.length === 0) {
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
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Registro de ticket</h1>
                
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
                    <form className="space-y-4" onSubmit={registerTicket}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fecha">Fecha</label>
                                <input 
                                    type="date" 
                                    id="fecha" 
                                    className="border border-gray-300 rounded-md p-2 w-full" 
                                    value={fecha} 
                                    onChange={(e) => setFecha(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <label htmlFor="hora">Hora</label>
                                <input 
                                    type="time" 
                                    id="hora" 
                                    className="border border-gray-300 rounded-md p-2 w-full" 
                                    value={hora} 
                                    onChange={(e) => setHora(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="idUsuario">Usuario</label>
                                <select 
                                    id="idUsuario" 
                                    className="border border-gray-300 rounded-md p-2 w-full" 
                                    value={idUsuario} 
                                    onChange={(e) => setIdUsuario(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Seleccione un usuario</option>
                                    {usuarios.map(usuario => (
                                        <option key={usuario._id || usuario.id} value={usuario._id || usuario.id}>
                                            {usuario.name || usuario.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tipoTicket">Tipo de ticket (Servicio)</label>
                                <select 
                                    id="tipoTicket" 
                                    className="border border-gray-300 rounded-md p-2 w-full" 
                                    value={tipoTicket} 
                                    onChange={(e) => setTipoTicket(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Seleccione tipo de ticket</option>
                                    {servicios.map(servicio => (
                                        <option key={servicio._id || servicio.id} value={servicio._id || servicio.id}>
                                            {servicio.name || servicio.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="item">Item</label>
                                <input 
                                    type="text" 
                                    id="item" 
                                    className="border border-gray-300 rounded-md p-2 w-full" 
                                    placeholder="Ingrese item" 
                                    value={item} 
                                    onChange={(e) => setItem(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="valor">Valor</label>
                                <input 
                                    type="number" 
                                    id="valor" 
                                    className="border border-gray-300 rounded-md p-2 w-full" 
                                    placeholder="Ingrese valor" 
                                    value={valor} 
                                    onChange={(e) => setValor(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500  ${
                                    (loading || !fecha || !hora || !idUsuario || !tipoTicket || !item || !valor) 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-brand-blue-600'
                                }`}
                                disabled={loading || !fecha || !hora || !idUsuario || !tipoTicket || !item || !valor}
                            >
                                {loading ? 'Registrando...' : 'Registrar Ticket'}
                            </button>
                        </div>
                    </form>
                </div>
                <h3 className='text-xl font-semibold text-brand-blue-700 mb-2 mt-6'>Tickets Registrados</h3>

                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-brand-blue-500 text-white">
                            <th className="px-4 py-2 border border-gray-300">ID</th>
                            <th className="px-4 py-2 border border-gray-300">Fecha y Hora</th>
                            <th className="px-4 py-2 border border-gray-300">Usuario</th>
                            <th className="px-4 py-2 border border-gray-300">Servicio</th>
                            <th className="px-4 py-2 border border-gray-300">Item</th>
                            <th className="px-4 py-2 border border-gray-300">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketsRegistrados.map((ticket) => (
                            <tr key={ticket._id} className="text-center border-b">
                                <td className="px-4 py-2 border border-gray-300">{ticket.idSeq}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    {new Date(ticket.fecha).toLocaleString('es-CL', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </td>
                                <td className="px-4 py-2 border border-gray-300">{ticket.usuario}</td>
                                <td className="px-4 py-2 border border-gray-300">{ticket.servicio}</td>
                                <td className="px-4 py-2 border border-gray-300">{ticket.item}</td>
                                <td className="px-4 py-2 border border-gray-300">${ticket.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}