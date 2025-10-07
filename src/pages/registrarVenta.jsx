import React, { useState } from 'react';

export default function RegistrarVenta() {
    const [ticketsRegistrados, setTicketsRegistrados] = useState([
        { id: 1, fecha: '2025-10-01 09:30', idUsuario: 'U123', tipoTicket: 'Desayuno', item: 'Café', valor: 3000 },
        { id: 2, fecha: '2025-10-01 13:20', idUsuario: 'U124', tipoTicket: 'Almuerzo', item: 'Ensalada', valor: 5000 }
    ]);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [idUsuario, setIdUsuario] = useState('');
    const [tipoTicket, setTipoTicket] = useState('');
    const [item, setItem] = useState('');
    const [valor, setValor] = useState('');
    
    const registerTicket = (fecha, hora, idUsuario, tipoTicket, item, valor) => {
        const nuevoTicket = {
            id: ticketsRegistrados.length + 1,
            fecha: `${fecha} : ${hora}`,
            idUsuario,
            tipoTicket,
            item,
            valor
        };
        setTicketsRegistrados([...ticketsRegistrados, nuevoTicket]);
    };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Registro de ticket</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        registerTicket(
                            e.target.fecha.value,
                            e.target.hora.value,
                            e.target.idUsuario.value,
                            e.target.tipoTicket.value,
                            e.target.item.value,
                            parseFloat(e.target.valor.value)
                        );
                        e.target.reset();
                    }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fecha">Fecha</label>
                                <input type="date" id="fecha" className="border border-gray-300 rounded-md p-2 w-full" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="hora">Hora</label>
                                <input type="time" id="hora" className="border border-gray-300 rounded-md p-2 w-full" value={hora} onChange={(e) => setHora(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="idUsuario">ID de usuario</label>
                                <input type="text" id="idUsuario" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Ingrese ID de usuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="tipoTicket">Tipo de ticket</label>
                                <select id="tipoTicket" className="border border-gray-300 rounded-md p-2 w-full" value={tipoTicket} onChange={(e) => setTipoTicket(e.target.value)}>
                                    <option value="">Seleccione tipo de ticket</option>
                                    <option value="Desayuno">Desayuno</option>
                                    <option value="Almuerzo">Almuerzo</option>
                                    <option value="Once">Once</option>
                                    <option value="Cena">Cena</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="item">Item</label>
                                <input type="text" id="item" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Ingrese item" value={item} onChange={(e) => setItem(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="valor">Valor</label>
                                <input type="number" id="valor" className="border border-gray-300 rounded-md p-2 w-full" placeholder="Ingrese valor" value={valor} onChange={(e) => setValor(e.target.value)} />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500  ${(!fecha || !hora || !idUsuario || !tipoTicket || !item || !valor) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-blue-600'}`}
                                disabled={!fecha || !hora || !idUsuario || !tipoTicket || !item || !valor}
                            >
                                Definir Vale
                            </button>
                        </div>
                    </form>
                </div>
                 <h3 className='text-xl font-semibold text-brand-blue-700 mb-2 mt-6'>Tickets Registrados</h3>

                <table className="min-w-full table-fixed">
                    <thead>
                        <tr className="bg-brand-blue-500 text-white">
                            <th className="px-4 py-2 border border-gray-300">ID</th>
                            <th className="px-4 py-2 border border-gray-300">Fecha</th>
                            <th className="px-4 py-2 border border-gray-300">ID de usuario</th>
                            <th className="px-4 py-2 border border-gray-300">Tipo de ticket</th>
                            <th className="px-4 py-2 border border-gray-300">Item</th>
                            <th className="px-4 py-2 border border-gray-300">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketsRegistrados.map((vale) => (
                            <tr key={vale.id} className="text-center border-b">
                                <td className="px-4 py-2 border border-gray-300">{vale.id}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.fecha}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.idUsuario}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.tipoTicket}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.item}</td>
                                <td className="px-4 py-2 border border-gray-300">{vale.valor}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}