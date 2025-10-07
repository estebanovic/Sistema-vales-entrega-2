import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => (
     <div>
        <div className="bg-linear-to-r/hsl from-brand-blue-300 to-brand-blue-500 to-50% flex items-center p-4">
            <img src={logo} alt="Logo" className="h-15 mr-4" />
            <span className="text-white text-2xl font-semibold">Sistema de Gestión Tickets de Alimentación</span>
        </div>
        <nav className="bg-brand-orange-500 p-4">
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
        </nav>
    </div>
);

export default Navbar;
