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
