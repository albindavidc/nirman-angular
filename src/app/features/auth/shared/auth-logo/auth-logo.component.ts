import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo-section">
      <div class="logo-glow"></div>
      <div class="logo-container">
        <img src="assets/logo.svg" alt="Nirman Logo" class="logo" />
      </div>
      <h1 class="brand-name">Nirman</h1>
      <p class="tagline">Revolutionize your construction workflow</p>
    </div>
  `,
  styleUrls: ['./auth-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLogoComponent {}
