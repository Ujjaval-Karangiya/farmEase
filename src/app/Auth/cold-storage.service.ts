import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ColdStorageRecord } from './cold-storage.model';

@Injectable({
  providedIn: 'root'
})
export class ColdStorageService {
  private apiUrl = 'https://api.data.gov.in/resource/0b827ac7-ebad-47c1-9cc9-816ce4ab10a7?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json';

  constructor(private http: HttpClient) { }

  getStorageData(): Observable<ColdStorageRecord[]> {
    // Constructing the URL with API key and format parameters
    const url = `${this.apiUrl}`;

    return this.http.get<any>(url).pipe(
      map(response => response.records) // Extracting only the records array
    );
  }
}
