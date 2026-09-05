# DevOps Dashboard

Panel de control para centralizar y gestionar proyectos deploy.

## Características

- **Autenticación de usuarios** - Sistema de login seguro con NextAuth
- **Gestión de proyectos** - Organiza tus proyectos con nombre, descripción, tipo, estado, íconos y etiquetas
- **Frontends** - Gestiona URLs públicas, dashboards, frameworks y repositorios
- **Backends** - Monitorea APIs, proveedores, frameworks, runtimes y logs
- **Bases de datos** - Administra proveedores, tipos, hosts y regiones
- **Monitoreo** - Seguimiento en tiempo real de tus proyectos
- **Logs de auditoría** - Historial de acciones realizadas

## Tecnologías

- **Next.js 16** - Framework React full-stack
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Drizzle ORM** - Mapeo objeto-relacional
- **LibSQL** - Base de datos SQLite
- **NextAuth v5** - Autenticación
- **Radix UI** - Componentes accesibles
- **Lucide React** - Íconos
- **Framer Motion** - Animaciones

## Instalación

bash
npm install


## Configuración

Crea un archivo `.env` basado en `.env.example` y configura tus variables de entorno.

## Ejecución

bash
npm run dev


## Build

bash
npm run build
npm start


## Base de datos

Migraciones y schema management con Drizzle:

bash
npx drizzle-kit generate
npx drizzle-kit migrate


## Estructura del proyecto


src/
├── app/              # Páginas y rutas Next.js
│   ├── (auth)/       # Rutas de autenticación
│   ├── api/          # API routes
│   └── dashboard/    # Panel principal
├── components/       # Componentes React
│   └── ui/           # Componentes UI
├── db/               # Database schema y conexión
├── lib/              # Utilidades y acciones
└── styles/           # Estilos globales


## Comandos

bash
pnpm dev
