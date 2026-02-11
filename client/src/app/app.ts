import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      Employee Management Tool
    </mat-toolbar>

    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .container {
      padding: 24px;
    }
  `]
})
export class App {}
