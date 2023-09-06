import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Firebase-Konfigurationsdaten aus environment.prod.ts
const firebaseConfig = environment.firebase;

// Initialisiere Firebase
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

