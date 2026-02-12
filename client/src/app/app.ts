import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="primary" class="toolbar">

      <div class="logo">
        Employee Management Tool
      </div>

      <div class="nav-links">
        <a
            mat-button
            routerLink="/tags"
            routerLinkActive="active-link"
        >
          Tags
        </a>

        <a
            mat-button
            routerLink="/employees"
            routerLinkActive="active-link"
        >
          Employees
        </a>

      </div>

    </mat-toolbar>

    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
    }

    .logo {
      font-weight: 500;
    }

    .nav-links {
      display: flex;
      gap: 8px;
    }

    .active-link {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 24px;
    }
  `],
})
export class App {}
