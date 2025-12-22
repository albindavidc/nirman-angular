import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthLogoComponent } from '../../shared/auth-logo/auth-logo.component';
import { VendorService } from '../../../vendor-management/services/vendor.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LoginActions from '../../login/store/login.actions';

@Component({
  selector: 'app-application-rejected',
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
          <div class="status-icon rejected">
            <mat-icon>cancel</mat-icon>
          </div>
          <h2 class="auth-title">Application Rejected</h2>
          <p class="auth-subtitle">
            We regret to inform you that your vendor application has been
            rejected.
          </p>

          <div class="reason-box" *ngIf="rejectionReason">
            <h3>Reason for Rejection</h3>
            <p>{{ rejectionReason }}</p>
          </div>

          <div class="info-box">
            <p>
              If you believe this decision was made in error or if you have
              addressed the issues mentioned above, please contact our support
              team or apply again.
            </p>
          </div>

          <div class="actions">
            <button
              mat-flat-button
              color="primary"
              (click)="onRequestRecheck()"
              [disabled]="isSubmitting"
            >
              Apply Again
            </button>
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

        &.rejected {
          background-color: rgba(255, 180, 171, 0.1);
          color: var(--md-sys-color-error);
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

      .reason-box {
        width: 100%;
        background-color: rgba(255, 180, 171, 0.05);
        border: 1px solid rgba(255, 180, 171, 0.2);
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 24px;
        text-align: left;

        h3 {
          color: var(--md-sys-color-error);
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        p {
          color: var(--md-sys-color-on-surface);
          margin: 0;
          font-size: 0.95rem;
        }
      }

      .info-box {
        margin-bottom: 32px;

        p {
          font-size: 0.9rem;
          color: var(--md-sys-color-on-surface-variant);
          margin: 0;
        }
      }

      .actions {
        display: flex;
        gap: 12px;
        flex-direction: column;
        width: 100%;

        a,
        button {
          width: 100%;
        }
      }
    `,
  ],
})
export class ApplicationRejectedComponent implements OnInit {
  rejectionReason: string | null = null;
  vendorId: string | null = null;
  isSubmitting = false;

  private readonly vendorService = inject(VendorService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly store = inject(Store); // Inject Store for logout

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.rejectionReason = user.rejectionReason;
        this.vendorId = user.vendorId; // Get vendorId specifically
      } catch (e) {
        console.error('Error parsing user from local storage', e);
      }
    }
  }

  onRequestRecheck(): void {
    if (!this.vendorId) {
      this.notification.error('Vendor ID missing. Please login again.');
      return;
    }

    this.isSubmitting = true;
    this.vendorService.requestRecheck(this.vendorId).subscribe({
      next: (updatedVendor) => {
        this.notification.success('Re-check request submitted successfully');

        // Update local storage to reflect pending status
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          user.vendorStatus = 'pending';
          user.rejectionReason = null;
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.router.navigate(['/auth/pending-approval']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.notification.error(
          error.error?.message || 'Failed to submit re-check request'
        );
      },
    });
  }

  onLogout(): void {
    // Clear local storage immediately to prevent GuestGuard loops
    localStorage.removeItem('user');
    this.store.dispatch(LoginActions.logout());
  }
}
