import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

/**
 * Punto de entrada principal de la aplicación.
 * Se encarga de iniciar el componente raíz y configurar los servicios globales.
 */
bootstrapApplication(App, {
  providers: [
    // Registra el sistema de enrutamiento utilizando las rutas definidas en app.routes.ts
    provideRouter(routes),
  ]
})
  // Captura y muestra cualquier error que ocurra durante el inicio de la aplicación
  .catch((err) => console.error(err));
