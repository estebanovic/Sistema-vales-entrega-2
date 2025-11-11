import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import logo from '../assets/images/logo.png';

export default function Login() {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!usuario || !password) {
            setError('Por favor complete todos los campos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Llamada al backend
            const response = await authAPI.login(usuario, password);
            
            // Login exitoso - guarda los datos del usuario
            login(response);
            
            // Navega al home
            navigate('/');
            
            // Limpiar campos
            setUsuario('');
            setPassword('');
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-6 py-12">
            <div className="w-4xl mx-auto">
                {/* <h1 className='text-3xl font-bold text-brand-blue-700 mb-4'>Iniciar Sesión</h1> */}
                <img src={logo} alt="Logo" className="h-15 mr-4 cursor-pointer" />
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

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
                                    disabled={loading}
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
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading || !usuario || !password}
                                className={`bg-brand-blue-500 text-white px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500 ${
                                    (loading || !usuario || !password) 
                                    ? 'opacity-50 cursor-not-allowed' 
                                    : 'hover:bg-brand-blue-600'
                                }`}
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}