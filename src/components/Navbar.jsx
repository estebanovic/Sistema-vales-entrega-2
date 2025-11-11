import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo.png';

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
     <div>
        <div className="bg-linear-to-r/hsl from-brand-blue-300 to-brand-blue-500 to-50% flex items-center p-4">
            <Link to="/">
                <img src={logo} alt="Logo" className="h-15 mr-4 cursor-pointer" />
            </Link>
            <span className="text-white text-2xl font-semibold">Sistema de Gestión Tickets de Alimentación</span>
        </div>
        <nav className="bg-brand-orange-500 p-4">
            <div className="flex justify-between items-center">
                <ul className="flex space-x-4">
                    <li>
                       <NavLink to="/" className={({ isActive }) =>
                                `text-white hover:underline${isActive ? ' font-bold' : ''}`
                            }>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/imprimir-vales" className={({ isActive }) =>
                                `text-white hover:underline${isActive ? ' font-bold' : ''}`
                            }>Generar Vales</NavLink>
                    </li>
                    <li>
                        <NavLink to="/definir-servicios" className={({ isActive }) =>
                                `text-white hover:underline${isActive ? ' font-bold' : ''}`
                            }>Definir Servicios</NavLink>
                    </li>
                    <li>
                        <NavLink to="/definir-vales" className={({ isActive }) =>
                                `text-white hover:underline${isActive ? ' font-bold' : ''}`
                            }>Definir Vales</NavLink>
                    </li>
                    <li>
                        <NavLink to="/generar-informe" className={({ isActive }) =>
                                `text-white hover:underline${isActive ? ' font-bold' : ''}`
                            }>Generar Informe</NavLink>
                    </li>
                    <li>
                        <NavLink to="/registrar-venta" className={({ isActive }) =>
                                `text-white hover:underline${isActive ? ' font-bold' : ''}`
                            }>Registrar Venta</NavLink>
                    </li>
                </ul>
                <button 
                    onClick={handleLogout}
                    className="text-white hover:underline font-semibold"
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    </div>
    );
};

export default Navbar;
