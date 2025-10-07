import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar = () => (
     <div>
        <div className="bg-linear-to-r/hsl from-brand-blue-300 to-brand-blue-500 to-50% flex items-center p-4">
            <img src={logo} alt="Logo" className="h-15 mr-4" />
            <span className="text-white text-2xl font-semibold">Sistema de Gestión Tickets de Alimentación</span>
        </div>
        <nav className="bg-brand-orange p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link to="/" className="text-white hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/imprimir-vales" className="text-white hover:underline">Imprimir Vales</Link>
                </li>
                <li>
                    <Link to="/definir-servicios" className="text-white hover:underline">Definir Servicios</Link>
                </li>
                <li>
                    <Link to="/definir-vales" className="text-white hover:underline">Definir Vales</Link>
                </li>
                <li>
                    <Link to="/generar-informe" className="text-white hover:underline">Generar Informe</Link>
                </li>
                <li>
                    <Link to="/registrar-venta" className="text-white hover:underline">Registrar Venta</Link>
                </li>
            </ul>
        </nav>
    </div>
);

export default Navbar;
