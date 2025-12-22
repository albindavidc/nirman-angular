import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ReasonDialogData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

@Component({
  selector: 'app-reason-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p class="mb-4">{{ data.message }}</p>
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Reason</mat-label>
        <textarea
          matInput
          [formControl]="reasonControl"
          placeholder="Please provide a reason..."
          rows="4"
        ></textarea>
        <mat-error *ngIf="reasonControl.hasError('required')">
          Reason is required
        </mat-error>
        <mat-error *ngIf="reasonControl.hasError('minlength')">
          Reason must be at least 10 characters
        </mat-error>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">
        {{ data.cancelButtonText || 'Cancel' }}
      </button>
      <button
        mat-flat-button
        color="warn"
        [disabled]="reasonControl.invalid"
        (click)="onConfirm()"
      >
        {{ data.confirmButtonText || 'Confirm' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .w-full {
        width: 100%;
        display: block;
      }
      .mb-4 {
        margin-bottom: 16px;
      }
      mat-dialog-content {
        min-width: 350px;
      }
    `,
  ],
})
export class ReasonDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ReasonDialogComponent>);
  readonly data = inject<ReasonDialogData>(MAT_DIALOG_DATA);

  reasonControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.reasonControl.valid) {
      this.dialogRef.close(this.reasonControl.value);
    }
  }
}
