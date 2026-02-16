import { Component, OnInit } from '@angular/core';
import { ColdStorageService } from './cold-storage.service';
import { ColdStorageRecord } from './cold-storage.model';

@Component({
  selector: 'app-cold-storage',
  templateUrl: './cold-storage.component.html'
})
export class ColdStorageComponent implements OnInit {
  records: ColdStorageRecord[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private storageService: ColdStorageService) { }

  ngOnInit(): void {
    this.storageService.getStorageData().subscribe({
      next: (data) => {
        this.records = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load storage data. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
