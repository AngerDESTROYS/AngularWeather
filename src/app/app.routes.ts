import { Routes } from '@angular/router';
import { HomeComponent } from './views/Home/Page/home.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./views/Home/Home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
