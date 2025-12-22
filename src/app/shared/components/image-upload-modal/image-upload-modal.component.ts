import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-image-upload-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="upload-modal">
      <div class="modal-header">
        <h2>Upload Profile Photo</h2>
        <button mat-icon-button (click)="onClose()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div
        class="drop-zone"
        [class.drag-over]="isDragOver"
        [class.has-file]="selectedFile"
        (click)="fileInput.click()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        <input
          type="file"
          #fileInput
          (change)="onFileSelected($event)"
          accept="image/*"
          style="display: none"
        />

        @if (isUploading) {
        <mat-spinner diameter="48"></mat-spinner>
        <p>Uploading...</p>
        } @else if (previewUrl) {
        <img [src]="previewUrl" alt="Preview" class="preview-image" />
        <p class="change-text">Click or drag to change</p>
        } @else {
        <mat-icon class="upload-icon">cloud_upload</mat-icon>
        <h3>Drag & Drop your image here</h3>
        <p>or click to browse</p>
        <span class="file-info">Supports: JPG, PNG, GIF, WEBP (Max 5MB)</span>
        }
      </div>

      @if (errorMessage) {
      <div class="error-message">
        <mat-icon>error</mat-icon>
        {{ errorMessage }}
      </div>
      }

      <div class="modal-actions">
        <button mat-stroked-button (click)="onClose()">Cancel</button>
        <button
          mat-flat-button
          color="primary"
          [disabled]="!selectedFile || isUploading"
          (click)="onUpload()"
        >
          @if (isUploading) {
          <mat-spinner diameter="20"></mat-spinner>
          } @else { Upload }
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .upload-modal {
        padding: 24px;
        background: var(--md-sys-color-surface-container-high);
        border-radius: 24px;
        min-width: 400px;
        max-width: 500px;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--md-sys-color-on-surface);
        }
      }

      .drop-zone {
        border: 2px dashed var(--md-sys-color-outline-variant);
        border-radius: 16px;
        padding: 48px 24px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: var(--md-sys-color-surface-container);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;

        &:hover,
        &.drag-over {
          border-color: var(--md-sys-color-primary);
          background: var(--md-sys-color-primary-container);
        }

        &.has-file {
          padding: 16px;
        }

        .upload-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
          color: var(--md-sys-color-primary);
          margin-bottom: 16px;
        }

        h3 {
          margin: 0 0 8px;
          color: var(--md-sys-color-on-surface);
          font-size: 1.1rem;
        }

        p {
          margin: 0;
          color: var(--md-sys-color-on-surface-variant);
          font-size: 0.9rem;
        }

        .file-info {
          margin-top: 16px;
          font-size: 0.75rem;
          color: var(--md-sys-color-on-surface-variant);
        }

        .preview-image {
          max-width: 100%;
          max-height: 200px;
          border-radius: 12px;
          object-fit: contain;
        }

        .change-text {
          margin-top: 12px;
          font-size: 0.85rem;
        }
      }

      .error-message {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
        padding: 12px;
        background: var(--md-sys-color-error-container);
        color: var(--md-sys-color-on-error-container);
        border-radius: 8px;
        font-size: 0.875rem;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        margin-top: 24px;

        button {
          border-radius: 24px;
          padding: 0 24px;
          height: 44px;
        }
      }
    `,
  ],
})
export class ImageUploadModalComponent {
  @Input() maxSizeBytes = 5 * 1024 * 1024; // 5MB default
  @Output() fileUploaded = new EventEmitter<File>();

  isDragOver = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  errorMessage: string | null = null;
  isUploading = false;

  constructor(private dialogRef: MatDialogRef<ImageUploadModalComponent>) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  processFile(file: File): void {
    this.errorMessage = null;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please select an image file';
      return;
    }

    // Validate file size
    if (file.size > this.maxSizeBytes) {
      this.errorMessage = `File size must be less than ${
        this.maxSizeBytes / 1024 / 1024
      }MB`;
      return;
    }

    this.selectedFile = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpload(): void {
    if (!this.selectedFile) return;
    this.dialogRef.close(this.selectedFile);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }
}
