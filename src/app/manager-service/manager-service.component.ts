import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerServiceService } from './manager-service.service';
import { FormsModule } from '@angular/forms';
import { FilterByIdPipe } from './filter-by-id.pipe';

@Component({
  selector: 'app-manager-service',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterByIdPipe],
  templateUrl: './manager-service.component.html',
  styleUrls: ['./manager-service.component.css'],
  providers: [ManagerServiceService]
})
export class ManagerServiceComponent implements OnInit {
  @ViewChild('newRequestsBtn', { static: true }) newRequestsBtn!: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  @ViewChild('searchLabel', { static: true }) searchLabel!: ElementRef;
  @ViewChild('requestsTable', { static: true }) requestsTable!: ElementRef;
  serviceRequests: any[] = [];
  workers: any[] = [];
  assignType: { [key: number]: string } = {}; // or {[key: string]: string} if your IDs are strings
  selectedWorker: { [key: number]: string } = {}; // key: request id, value: worker id
  searchId: string = '';
  newRequestsCount: number = 0;
  filteredRequests: any[] = []; // Add this line
  showOnlyNew: boolean = false; // Add this line
  filterStatus: string = '';
  showWelcome = true;

  constructor(private managerService: ManagerServiceService) {}

  ngOnInit(): void {
    this.managerService.getAllWorkers().subscribe((workers: any[]) => {
      this.workers = workers;
      this.fetchRequests();
    });
    setTimeout(() => {
      this.showWelcome = false;
    }, 1800); // Show for 1.8 seconds
  }

  fetchRequests() {
    this.managerService.getAllRequests().subscribe((requests: any[]) => {
      this.serviceRequests = requests;
      this.updateNewRequestsCount(); // Update the count whenever requests are fetched
    });
  }

  fetchWorkers() {
    this.managerService.getAllWorkers().subscribe((workers: any[]) => {
      this.workers = workers;
    });
  }

  // Update selectedWorker type to string
  // Update approveRequest logic to treat workerId as string

  // No additional code needed here for $PLACEHOLDER$.
  // But update the class property and approveRequest method as follows:

  // Change this line at the top:
  // selectedWorker: { [key: number]: string } = {}; // key: request id, value: worker id

  // In approveRequest:
  approveRequest(req: any) {
    let workerId: string | null = null;
    let workerName: string | null = null;
    if (this.assignType[req.id] === 'random') {
      const randomWorker = this.workers[Math.floor(Math.random() * this.workers.length)];
      workerId = randomWorker?.id?.toString();
      workerName = randomWorker?.name;
    } else if (this.assignType[req.id] === 'manual') {
      const selectedWorkerId = this.selectedWorker[req.id];
      workerId = selectedWorkerId !== undefined && selectedWorkerId !== null ? selectedWorkerId : null;
      const selected = this.workers.find(w => w.id?.toString() === workerId);
      workerName = selected ? selected.name : null;
    }
    if (!workerId) {
      alert('Please select a valid worker before approving the request.');
      return;
    }
    this.managerService.approveRequest(req.id, workerId, workerName ?? '').subscribe(() => {
      alert('Request approved and worker assigned!');
      this.fetchRequests();
    });
  }
  rejectRequest(req: any) {
    this.managerService.rejectRequest(req.id).subscribe(() => {
      alert('Request rejected!');
      this.fetchRequests();
    });
  }

  // Example: Call this when new requests are fetched from backend
  updateNewRequestsCount() {
    this.newRequestsCount = this.serviceRequests.filter(
      req => (req.status || '').trim().toLowerCase() === 'submitted'
    ).length;
  }

  showNewRequests() {
    this.showOnlyNew = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.showOnlyNew) return;

    const target = event.target as Node;

    // If click is on the button, search input, search label, or table, do nothing
    if (
      (this.newRequestsBtn && this.newRequestsBtn.nativeElement.contains(target)) ||
      (this.searchInput && this.searchInput.nativeElement.contains(target)) ||
      (this.searchLabel && this.searchLabel.nativeElement.contains(target)) ||
      (this.requestsTable && this.requestsTable.nativeElement.contains(target))
    ) {
      return;
    }

    // Otherwise, show all requests
    this.showOnlyNew = false;
  }

  // Optional: Add a method to show all requests again
  showAllRequests() {
    this.showOnlyNew = false;
  }

  get displayedRequests() {
    let filtered = this.showOnlyNew
      ? this.serviceRequests.filter(r => (r.status || '').trim().toLowerCase() === 'submitted')
      : this.serviceRequests;

    if (this.filterStatus === 'approved') {
      filtered = filtered.filter(r => (r.status || '').trim().toLowerCase() === 'approved');
    } else if (this.filterStatus === 'rejected') {
      filtered = filtered.filter(r => (r.status || '').trim().toLowerCase() === 'rejected');
    }
    return filtered;
  }
}