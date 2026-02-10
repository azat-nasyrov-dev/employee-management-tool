import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employees',
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.routes').then(
        (m) => m.EMPLOYEES_ROUTES,
    ),
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./features/tags/tags.routes').then(
        (m) => m.TAGS_ROUTES,
      ),
  },
];
