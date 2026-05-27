# 📓 Bitácora de Aprendizaje: Portal de Expedientes

Este documento es una guía paso a paso de cómo hemos construido este proyecto desde cero, diseñada para recordar los hitos y conceptos clave.

---

## 🚀 Hito 1: Cimentación y Modelo de Datos
Todo proyecto necesita una estructura. Lo primero que hicimos fue definir qué es un "Expediente".
*   **Acción:** Creamos la interfaz `Expediente` en `src/models/expediente.ts`.
*   **Concepto clave:** Las **Interfaces** en TypeScript sirven para definir la "forma" que tendrán nuestros objetos (id, número, estado, etc.), asegurando que no olvidemos ningún dato importante.

## 📥 Hito 2: La Bandeja de Entrada (Gestión de Datos)
Creamos el lugar donde el usuario puede ver, agregar y eliminar expedientes.impo
*   **Acción:** Implementamos el componente `Bandeja`.
*   **Conceptos clave:**
    *   **Data Binding:** Usamos `[(ngModel)]` para que lo que el usuario escribe en el formulario se guarde automáticamente en nuestras variables.
    *   **LocalStorage:** Implementamos el guardado persistente. Así, aunque cierres el navegador, tus expedientes siguen ahí. Es como un "baúl" de recuerdos del navegador.
    *   **Arrays y Filtros:** Aprendimos a usar `.push()` para agregar y `.filter()` para eliminar elementos de una lista.

## 🧭 Hito 3: Navegación entre Páginas (Routing)
Hicimos que nuestra aplicación tuviera varias secciones (Inicio, Bandeja, Reportes).
*   **Acción:** Configuramos `app.routes.ts` y creamos un menú lateral en `app.html`.
*   **Concepto clave:** **SPA (Single Page Application)**. La página nunca se recarga por completo, solo cambia el contenido central, lo que la hace muy rápida.

## 📊 Hito 4: Dashboard de Reportes (Visualización Intuitiva)
Transformamos los datos crudos en información visual útil para el usuario.
*   **Acción:** Creamos el componente `Reportes` con tarjetas de colores.
*   **Conceptos clave:**
    *   **Comunicación entre componentes:** Aprendimos que dos componentes diferentes pueden compartir información si ambos miran el mismo `localStorage`.
    *   **Getters:** Usamos funciones `get` para calcular totales automáticamente.
    *   **Psicología del Color en UI:** Aplicamos colores semánticos (Naranja=Pendiente, Verde=Finalizado) para que la interfaz sea "intuitiva" (se entienda sin leer).

---

## 💡 Concepto: Enrutamiento Dinámico
El **enrutamiento dinámico** permite que una sola "página" se adapte para mostrar información diferente dependiendo de un parámetro en la URL.

*   **Ruta Estática:** `/bandeja` (Siempre igual).
*   **Ruta Dinámica:** `/detalle-expediente/:id` (El `:id` es variable, como `/detalle-expediente/1` o `/detalle-expediente/5`).
*   **Utilidad:** Permite crear una sola pantalla de "Detalles" que sirva para miles de expedientes diferentes, cargando la información específica según el ID que aparezca en la barra de direcciones.

---

## 🛠️ Tecnologías utilizadas hasta ahora:
1.  **Angular (Standalone Components):** Componentes modernos y fáciles de manejar.
2.  **TypeScript:** Para un código ordenado y sin errores de dedo.
3.  **CSS Flexbox:** Para que nuestras tarjetas se vean bien en cualquier tamaño de pantalla.
4.  **JSON (stringify/parse):** Para convertir objetos en texto y viceversa.

---
*Este archivo se irá actualizando a medida que avancemos con nuevas funcionalidades.*


Implemente una funcionalidad que permita cambiar dinámicamente el estado de un expediente desde la Bandeja de Trabajo.
 
Cada expediente debe avanzar entre los siguientes estados:
 
Pendiente
En proceso
Finalizado
 
Agregue un botón “Cambiar estado” en la tabla.
Cada vez que el usuario haga clic, el expediente deberá avanzar al siguiente estado.
 
Además:
 
La tabla debe actualizarse automáticamente.
El color visual del estado debe cambiar correctamente.
Los cambios deben mantenerse usando localStorage.



# Actividad - 12-05-2026 para jueves 14-05-2026

Ejercicio:
 
Desarrolle una funcionalidad que permita editar expedientes dentro del Portal de Expedientes Electrónicos. Para ello, agregue un botón “Editar” en la Bandeja de Trabajo y cree una nueva vista accesible mediante una ruta dinámica (/expedientes/editar/:id). La vista debe cargar la información del expediente seleccionado y permitir modificar nombre, estado, prioridad y fecha de creación.
 
Los cambios realizados deben actualizar la información almacenada en localStorage. Además, mejore visualmente la tabla resaltando los expedientes con prioridad alta. Como desafío adicional, incorpore validación visual para evitar guardar formularios con campos vacíos.


# Desarrollo de la actividad 14-05-2026

## 📝 Hito 5: Edición y Validación de Datos (Formularios Dinámicos)
Implementamos la capacidad de modificar expedientes existentes, mejorando la interactividad y la robustez del sistema.
*   **Acciones:**
    *   **Botón de Edición:** Agregamos un botón "Editar" en la `Bandeja` que redirige a una nueva ruta dinámica.
    *   **Componente EditarExpediente:** Creamos una nueva vista con un formulario que carga los datos desde `localStorage`.
    *   **Resaltado Visual:** Aplicamos estilos condicionales en la tabla de la `Bandeja` para resaltar expedientes con **Prioridad Alta** (fondo rosado suave).
    *   **Validación de Formularios:** Implementamos lógica para evitar guardar campos vacíos, mostrando mensajes de error y resaltando los inputs en rojo.
*   **Conceptos clave:**
    *   **Rutas Dinámicas con Parámetros:** Usamos `:id` en la ruta para identificar qué expediente editar.
    *   **Clonación de Objetos:** Usamos el operador spread `{...encontrado}` para editar una copia del objeto y solo guardar si el usuario confirma.
    *   **UX (User Experience):** La validación visual ayuda al usuario a entender por qué no puede guardar un cambio, mejorando la usabilidad.
    *   **Persistencia Refinada:** Aseguramos que los cambios se sincronicen correctamente en el array global de `localStorage`.


# Actividad - 14-05-2026 para martes 19-05-2026

*   Actividad:
 
Desarrolle una nueva funcionalidad para el Portal de Expedientes que permita gestionar “observaciones” asociadas a cada expediente. Para ello, agregue un campo de observaciones en la creación y edición de expedientes, mostrando posteriormente esta información tanto en la vista de detalle como en la bandeja. La información debe mantenerse utilizando el servicio ExpedienteService, evitando acceder directamente a localStorage desde los componentes.
 
Además, cree una nueva vista llamada “Pendientes” accesible desde el menú lateral, donde se muestren únicamente los expedientes con estado “Pendiente”. La navegación debe implementarse utilizando Angular Router y componentes standalone. Como mejora visual, destaque automáticamente los expedientes de prioridad alta utilizando estilos dinámicos.


# Actividad - 19-05-2026 

*   Actividad: Los alumnos deberán agregar una nueva funcionalidad que permita registrar un historial básico cada vez que un expediente cambie de estado. Por ejemplo, cuando pase de “Pendiente” a “En proceso” o de “En proceso” a “Finalizado”, el sistema deberá guardar una entrada con la fecha del cambio, el estado anterior, el nuevo estado y una observación breve.
 
Este historial debe mostrarse en la vista de detalle del expediente. La información debe manejarse mediante ExpedienteService, mantenerse en localStorage y visualizarse usando directivas como @if y @for. Como mejora visual, deben aplicar pipes para mostrar la fecha del cambio en formato dd-MM-yyyy.


Implemente una nueva funcionalidad llamada “Calendario de vencimientos” para el Portal de Expedientes. Cada expediente deberá incorporar una fecha de vencimiento y el sistema deberá mostrar visualmente cuáles expedientes están próximos a vencer o ya vencieron. Para ello, agregue el nuevo campo en creación y edición de expedientes, muestre la información en la Bandeja y aplique estilos dinámicos según el estado temporal del vencimiento.
 
Además, cree una nueva vista llamada “Próximos a vencer”, accesible desde el menú lateral mediante Angular Router, donde se muestren únicamente los expedientes cuya fecha de vencimiento esté dentro de los próximos 7 días. La solución debe utilizar ExpedienteService, directivas estructurales (@if, @for) y pipes para el formateo de fechas.


# Actividad - 26-05-2026

Desarrolle una nueva vista llamada Kanban para el Portal de Expedientes, accesible desde el menú lateral mediante Angular Router. Esta vista deberá presentar los expedientes en un formato visual organizado por columnas según su estado, reemplazando la visualización tradicional basada en tablas. Las columnas requeridas serán: Pendiente, En proceso y Finalizado.
 
Cada expediente deberá mostrarse dentro de una tarjeta utilizando Angular Material (mat-card) e incluir como mínimo: nombre del expediente, prioridad, fecha de creación y observaciones. La información deberá obtenerse exclusivamente mediante ExpedienteService, evitando acceder directamente a localStorage, y se deberán utilizar directivas para generar dinámicamente las columnas y el contenido.
 
Como mejora visual, destaque automáticamente la prioridad del expediente mediante estilos dinámicos y aplique pipes para el formato de fechas. Como desafío opcional, incorpore botones que permitan cambiar el estado del expediente directamente desde la tarjeta para moverlo entre columnas sin volver a la Bandeja de Trabajo.
