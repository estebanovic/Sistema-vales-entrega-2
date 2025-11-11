import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!usuario || !password) {
            return;
        }
        // Login básico - en producción deberías validar contra un backend
        login({ usuario, rol: 'admin' });
        navigate('/home');
        // Limpiar campos
        setUsuario('');
        setPassword('');
    };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Iniciar Sesión</h1>
                <div className="bg-white shadow-xl rounded-lg w-full p-6">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="grid gap-4">
                            <div>
                                <label htmlFor="usuario" className="block text-sm font-medium text-brand-blue-700 mb-1">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    name="usuario"
                                    id="usuario"
                                    value={usuario}
                                    onChange={e => setUsuario(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    placeholder="Ingrese su usuario"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-brand-blue-700 mb-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
                                    placeholder="Ingrese su contraseña"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!usuario || !password}
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${(!usuario || !password) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-blue-600'}`}
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
