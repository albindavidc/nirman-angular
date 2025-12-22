import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Profile,
  UpdateProfileDto,
  UpdatePasswordDto,
} from '../models/profile.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = `${environment.apiUrl}/profile`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  updateProfile(dto: UpdateProfileDto): Observable<Profile> {
    return this.http.put<Profile>(this.apiUrl, dto);
  }

  updatePassword(dto: UpdatePasswordDto): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/password`, dto);
  }

  uploadProfilePhoto(
    file: File
  ): Observable<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string; filename: string }>(
      `${this.uploadUrl}/profile-photo`,
      formData
    );
  }
}
