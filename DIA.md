# 📋 Reporte de Progreso General - Proyecto 03

## 👤 Reporte de Progreso - Miembro 1

### 📒 Datos Generales
- **Estudiante:** Torrez Joaquin
- **Ejercicio Asignado:**
  - **Ejercicio 01:** Simulación de lanzamiento de un dado de 6 caras con interfaz visual (display/caras, botón único y mensajes condicionales según el resultado numérico generado por `Math.floor(Math.random() * 6) + 1`).
  - **Ejercicio 02:** Integración de un formulario dinámico para ingresar datos del jugador (nombre, apellido y edad) y visualización en tiempo real mediante una ficha en la misma página.

## 🧩 Implementación del Custom Hook Puente (`usarJuegoDado.js`)

El proyecto centraliza toda la lógica de estado y gestión de eventos en un Custom Hook que actúa como el puente absoluto entre el Cerebro (servicios/JSON) y la Interfaz de Usuario (UI).

- **`useState` (Gestión de Memoria y Estados):**
  - **Función:** Permite que React almacene y actualice de forma reactiva los valores que cambian según la interacción del usuario.
  - **Utilidad:** Se utiliza para registrar los datos del formulario (`jugador`), los mensajes de error de validación (`errorValidacion`), el valor numérico actual del dado, los estados de animación (`girando`, `rebotando`) y las coordenadas espaciales de transformación tridimensional (`rotacion`).

- **`useRef` (Referencias Persistentes):**
  - **Función:** Almacena valores mutables que persisten durante todo el ciclo de vida del componente sin desencadenar renderizados innecesarios en la pantalla.
  - **Utilidad:** Permite controlar el bloqueo de concurrencia durante la animación del dado (`estaGirandoRef`), acumular el historial de grados de rotación tridimensional (`vueltasAcumuladasRef`) y administrar de manera segura los identificadores de los temporizadores asíncronos (`setTimeout` y `clearTimeout`).

- **`useEffect` (Efectos Secundarios y Limpieza):**
  - **Función:** Ejecuta procesos automáticos durante el ciclo de vida del componente.
  - **Utilidad:** Implementa la función de limpieza (*cleanup*) para destruir y limpiar los temporizadores activos cuando el componente se desmonta, previniendo eficazmente fugas de memoria en el navegador.

- **`useMemo` (Optimización de Rendimiento):**
  - **Función:** Memoriza el resultado de cálculos complejos para evitar procesamientos repetitivos innecesarios.
  - **Utilidad:** Calcula de forma optimizada las reglas y mensajes asociados al valor actual del dado únicamente cuando cambian las variables de dependencia (`girando` o `dado`).

- **Ubicación en la Arquitectura:** `src/js/usarJuegoDado.js`

---

### 🌐 Justificación del Archivo `.json` (`reglasJuego.json`)

- **Función:** 
  - Almacenar de forma externa, desacoplada y estructurada todas las reglas estáticas del sistema, los textos de la interfaz, las configuraciones de tiempo y los mensajes condicionales del juego.

- **Utilidad:** 
  - Separa completamente los datos textuales y de configuración del código fuente en JavaScript. Esto permite modificar etiquetas, tiempos o mensajes directamente en el archivo `.json` sin arriesgar ni alterar la lógica de programación.

- **Problema que evitó:** 
  - Evitó el uso desordenado de múltiples estructuras condicionales anidadas (`if / else` o `switch`) y la saturación de textos fijos quemados directamente en el código de JavaScript ("código espagueti").

---

### 🎲 Construcción y Justificación del Dado Tridimensional (`DadoTridimensional.jsx`)

- **Técnicas y Propiedades CSS Utilizadas:**
  - **`perspective` & `transform-style: preserve-3d`:** Configuración del contenedor para habilitar un entorno espacial tridimensional real procesado por la GPU del navegador.
  - **`transform: translateZ()`:** Posicionamiento en el eje de profundidad para proyectar cada una de las 6 caras desde el núcleo del cubo hacia el exterior.
  - **`transform: rotateX() rotateY()`:** Aplicación de matrices de rotación basadas en las coordenadas matemáticas definidas en el servicio para orientar la cara correcta hacia el frente.
  - **`transition: transform` con curvas `cubic-bezier`:** Generación de un movimiento físico fluido con aceleración y desaceleración realista.

- **Función:** 
  - Renderizar un objeto volumétrico 3D puro mediante HTML y CSS, donde las caras ocupan ubicaciones espaciales exactas y se orientan dinámicamente según el resultado de la tirada.

- **Utilidad:** 
  - Proporciona una simulación interactiva de alta fidelidad visual sin requerir la importación de librerías externas de renderizado pesado (como Three.js) ni el uso de imágenes o GIFs.

- **Problema que evitó:** 
  - Evitó el consumo excesivo de memoria y ancho de banda por recursos gráficos pesados, aprovechando al máximo la aceleración por hardware nativa del navegador.

---

### ⚡ Uso de Funciones Flecha (Arrow Functions)

- **¿Dónde se aplicaron específicamente?:** 
  - En los manejadores de eventos del Custom Hook (`usarJuegoDado.js`) como `lanzarDado` y `manejarCambioEntrada`.
  - En los componentes de interfaz (`JuegoPagina.jsx`, `DadoTridimensional.jsx`) para estructurar funciones de mapeo de arreglos (`.map()`) y la captura de eventos de usuario (`onClick` y `onChange`).

- **Función:** 
  - Sintaxis moderna y compacta de JavaScript para la declaración de funciones (`() => {}`).

- **Utilidad:** 
  - Mantienen un código sumamente limpio, legible y directo. Además, preservan de forma automática el contexto del ámbito léxico dentro de los componentes de React.

- **Problema que evitó:** 
  - Evitó la sintaxis confusa de las funciones tradicionales de JavaScript, manteniendo un estándar de código moderno y unificado.

---

### 🚪 Implementación de Puntos de Entrada Centralizados (`index.js`)

- **Patrón Arquitectónico Implementado:**
  - **Patrón Fachada (*Facade Pattern*) y Encapsulamiento de Caja Negra:** Se aplica el principio de diseño para ocultar la complejidad interna de las carpetas y ofrecer una interfaz de comunicación única y estable.

- **Función:** 
  - Actuar como un punto de acceso unificado en cada carpeta clave del sistema (`services/`, `components/`, `js/`), reexportando de manera estructurada los recursos, componentes y ganchos (*hooks*) hacia los módulos consumidores.

- **Utilidad:** 
  - **Optimización de rutas de importación:** Elimina la dependencia de rutas relativas complejas (como `../../`), permitiendo importar directamente desde el nombre de la carpeta base.
  - **Desacoplamiento modular:** Permite que las vistas y componentes externos interactúen con las interfaces públicas sin necesidad de conocer la distribución física de los archivos internos.

- **Problema que evitó:** 
  - Evitó que los archivos dependieran estrictamente unos de otros, simplificó la forma de conectar las carpetas y facilitó mover o cambiar código en el futuro sin romper la estructura del proyecto.

### 🚪 Implementación de Puntos de Entrada Centralizados (index.js)

- Función: 
  - Actuar como un punto de acceso unificado en cada carpeta clave del sistema (services/, components/, js/), reexportando de manera estructurada los recursos, componentes y ganchos (hooks) hacia los módulos consumidores.

- Utilidad: 
  - Optimización de rutas de importación: Elimina la dependencia de rutas relativas complejas (como ../../), permitiendo importar directamente desde el nombre de la carpeta base.
  - Desacoplamiento modular: Permite que las vistas y componentes externos interactúen con las interfaces públicas sin necesidad de conocer la distribución física de los archivos internos.

- Problema que evitó: 
  - Evitó que los archivos dependieran estrictamente unos de otros, simplificó la forma de conectar las carpetas y facilitó mover o cambiar código en el futuro sin romper la estructura del proyecto.

### 📊 Ejemplo Práctico: Antes y Después del Punto de Entrada

#### ❌ ANTES (Sin el archivo index.js)
Para importar el gancho en tu página principal, tenías que adentrarte manualmente entre las carpetas escribiendo una ruta larga, fea y frágil:
import { usarJuegoDado } from '../../js/customHooks/usarJuegoDado.js';

#### ✔️ DESPUÉS (Con el archivo index.js)
Gracias a crear el archivo index.js con la instrucción:
export { usarJuegoDado } from './usarJuegoDado.js';

La importación desde la página principal se vuelve limpia, corta y directa llamando únicamente a la carpeta:
import { usarJuegoDado } from '../js';

- Ventaja clave: A la página ya no le importa la estructura interna. Si en el futuro necesitas mover el archivo de lugar, solo actualizas la línea dentro del index.js y el resto de tu proyecto sigue funcionando sin romperse.

### 📁 Gestión de Archivos
- **Archivos y Carpeta Creados:** 
  - `src/componets/DadoTridimensional.jsx`
  - `src/componets/FichaJugador.jsx`
  - `src/css/estilos.css`
  - `src/js/usarJuegoDado.js`
  - `src/services/servicioJuego.js`
  - `src/services/reglasJuego.json`
  - `src/services/index.js`
  - `src/js/index.js`
  - `src/components/index.js`
- **Archivos Modificados:**
  - `src/componets/DadoTridimensional.jsx`
  - `src/componets/FichaJugador.jsx`
  - `src/css/estilos.css`
  - `src/js/usarJuegoDado.js`
  - `src/services/servicioJuego.js`
  - `src/services/reglasJuego.json`
  - `src/services/index.js`
  - `src/js/index.js`
  - `src/components/index.js`
  - `src/main.jsx`
  - `src/App.jsx`
- **Archivos Eliminados:** N/A