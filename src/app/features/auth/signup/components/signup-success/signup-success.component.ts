import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="success-container" @fadeInUp>
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h1>Account Created Successfully!</h1>
        <p>Your vendor account has been verified and created.</p>
        <a routerLink="/auth/login" class="login-btn"> Go to Login </a>
      </div>
    </div>
  `,
  styles: [
    `
      .success-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--md-sys-color-background);
        padding: 20px;
      }

      .success-card {
        text-align: center;
        background: var(--md-sys-color-surface-container-high);
        border-radius: 28px;
        padding: 48px;
        max-width: 400px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid var(--md-sys-color-outline-variant);
      }

      .success-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 24px;
        background: var(--md-extended-color-success-color);
        color: var(--md-extended-color-success-on-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        font-weight: bold;
      }

      h1 {
        color: var(--md-sys-color-on-surface);
        font-size: 1.5rem;
        margin: 0 0 12px;
      }

      p {
        color: var(--md-sys-color-on-surface-variant);
        margin: 0 0 32px;
      }

      .login-btn {
        display: inline-block;
        padding: 14px 32px;
        background: linear-gradient(
          135deg,
          var(--md-sys-color-primary) 0%,
          var(--md-extended-color-success-color) 100%
        );
        color: var(--md-sys-color-on-primary);
        text-decoration: none;
        border-radius: 24px;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(233, 193, 108, 0.4);
        }
      }
    `,
  ],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class SignupSuccessComponent {}
