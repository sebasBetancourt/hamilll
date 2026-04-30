# Clean Architecture - Landing Page

Esta documentación describe la organización de carpetas y los principios de arquitectura aplicados en este proyecto de Next.js. El objetivo es mantener una separación clara de responsabilidades, facilitando el mantenimiento y la escalabilidad.

## Organización de Carpetas (`src/`)

El proyecto se divide en las siguientes capas principales:

### 1. `app/` (Capa de Presentación - Entry Point)
Contiene el sistema de enrutamiento de Next.js (App Router). 
- **Layouts**: Estructuras globales de la aplicación.
- **Pages**: Definición de rutas. Las páginas deben ser ligeras y delegar la lógica a los módulos correspondientes.
- **API**: Endpoints de la API (si los hay).

### 2. `modules/` (Lógica de Negocio por Características)
Organiza el código por "features" o módulos. Para una landing page, el módulo principal es `landing`. Cada módulo sigue una estructura interna:
- **`domain/`**: Define las reglas de negocio, entidades e interfaces. Es código puramente TypeScript, sin dependencias de frameworks.
- **`data/`**: Implementaciones de acceso a datos (fetch de APIs, mappers, repositorios).
- **`application/`**: Casos de uso o hooks de React que coordinan la lógica entre `domain` y `components`.
- **`components/`**: Componentes de UI específicos de este módulo (p. ej., `HeroSection`, `ContactForm`).

### 3. `shared/` (Componentes y Utilidades Reutilizables)
Recursos que se utilizan en múltiples módulos.
- **`components/`**: Componentes atómicos o de diseño (Buttons, Modals, Cards).
- **`hooks/`**: Hooks genéricos (p. ej., `useLocalStorage`, `useWindowSize`).
- **`utils/`**: Funciones auxiliares genéricas.

### 4. `core/` (Configuración Global)
Configuraciones globales que no cambian frecuentemente.
- **Config**: Configuración de Firebase, Sentry, o clientes de API.
- **Constants**: Enums y constantes globales.

### 5. `types/`
Definiciones de tipos de TypeScript globales que se usan en todo el proyecto.

---

## Flujo de Dependencias

Siguiendo Clean Architecture, las dependencias siempre deben ir hacia adentro (hacia el Dominio):
- `app` -> `modules` -> `shared`
- `modules/components` -> `modules/application` -> `modules/domain`

El **Dominio** no debe depender de nada externo (ni de React, ni de librerías de UI).

## Beneficios
- **Escalabilidad**: Es fácil añadir nuevos módulos sin afectar a los existentes.
- **Testeabilidad**: La lógica de negocio en `domain` y `application` se puede testear sin necesidad de renderizar componentes de UI.
- **Mantenibilidad**: Es fácil encontrar dónde está cada pieza de código.
