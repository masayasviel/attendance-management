import type { Routes } from '@angular/router';
import { TemplateComponent } from './internal/template/template.component';

export const routes: Routes = [
  {
    path: '**',
    component: TemplateComponent,
    loadChildren: () => import('./internal/internal.routes').then((m) => m.routes),
  },
];
