import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthLogoComponent } from '../../shared/auth-logo/auth-logo.component';
import { Store } from '@ngrx/store';
import * as LoginActions from '../../login/store/login.actions';

@Component({
  selector: 'app-pending-approval',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    AuthLogoComponent,
  ],
  template: `
    <div class="auth-page">
      <app-auth-logo></app-auth-logo>
      <mat-card class="auth-card">
        <mat-card-content class="text-center">
          <div class="status-icon pending">
            <mat-icon>hourglass_empty</mat-icon>
          </div>
          <h2 class="auth-title">Application Under Review</h2>
          <p class="auth-subtitle">
            Your vendor application has been submitted and is currently being
            reviewed by our admin team.
          </p>
          <div class="info-box">
            <p>
              This process typically takes 1-2 business days. You will receive
              an email notification once your account status changes.
            </p>
          </div>
          <div class="actions">
            <button mat-button color="primary" (click)="onLogout()">
              Back to Login
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .auth-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background-color: var(--md-sys-color-surface);
      }

      .auth-card {
        width: 100%;
        max-width: 450px;
        border-radius: 24px;
        padding: 32px 16px;
        margin-top: 24px;
        background-color: var(--md-sys-color-surface-container);
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
      }

      .text-center {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .status-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;

        mat-icon {
          font-size: 40px;
          width: 40px;
          height: 40px;
        }

        &.pending {
          background-color: rgba(255, 183, 134, 0.1);
          color: var(--md-extended-color-warning-color);
        }
      }

      .auth-title {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 0 12px;
        color: var(--md-sys-color-on-surface);
      }

      .auth-subtitle {
        color: var(--md-sys-color-on-surface-variant);
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 24px;
      }

      .info-box {
        background-color: var(--md-sys-color-surface);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 32px;
        width: 100%;
        box-sizing: border-box;

        p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--md-sys-color-on-surface-variant);
        }
      }
    `,
  ],
})
export class PendingApprovalComponent {
  private readonly store = inject(Store);

  onLogout(): void {
    localStorage.removeItem('user');
    this.store.dispatch(LoginActions.logout());
  }
}
