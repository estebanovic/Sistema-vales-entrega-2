# Sistema de Emisión y Control de Vales de Alimentación

Este proyecto es una aplicación web para la gestión automatizada de vales de alimentación de la empresa Ticketmeal S.A. Permite emitir, controlar y auditar vales para los funcionarios según sus turnos y servicios disponibles.

## Características principales
- Emisión de vales personalizados por turno y tipo de usuario.
- Registro y control de vales generados y utilizados.
- Definición y gestión de servicios de alimentación.
- Interfaz moderna con React y Tailwind CSS.
- Impresión de vales y generación de informes.

## Estructura del proyecto
```
src/
  components/
    Navbar.jsx
    Footer.jsx
  pages/
    definirServicios.jsx
    definirVales.jsx
    generarInforme.jsx
    home.jsx
    imprimirVales.jsx
    registrarVenta.jsx
  assets/
    images/
      icon.png
      logo.png
App.jsx
main.jsx
index.css
```

## Instalación y uso
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Accede a la app en tu navegador en `http://localhost:5173` (o el puerto configurado).

---
Desarrollado para la asignatura de Desarrollo Web y Móvil.
