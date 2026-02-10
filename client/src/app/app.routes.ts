import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employees',
  },
  {
    path: 'tags',
    loadChildren: () =>
      import('./tags/tags.routes').then(
        (m) => m.TAGS_ROUTES,
      ),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.routes').then(
        (m) => m.EMPLOYEES_ROUTES,
    ),
  },
];
