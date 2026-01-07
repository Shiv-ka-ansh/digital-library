import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  booksIssued: number;
  joinDate: Date;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatMenuModule,
    FormsModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Users Management</h1>
          <p class="page-subtitle">Manage library members and staff</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>person_add</mat-icon>
          Add New User
        </button>
      </header>

      <div class="stats-row">
        <div class="stat-card">
          <mat-icon>people</mat-icon>
          <div class="stat-info">
            <span class="stat-value">3,241</span>
            <span class="stat-label">Total Users</span>
          </div>
        </div>
        <div class="stat-card">
          <mat-icon>check_circle</mat-icon>
          <div class="stat-info">
            <span class="stat-value">2,890</span>
            <span class="stat-label">Active</span>
          </div>
        </div>
        <div class="stat-card">
          <mat-icon>pause_circle</mat-icon>
          <div class="stat-info">
            <span class="stat-value">351</span>
            <span class="stat-label">Inactive</span>
          </div>
        </div>
      </div>

      <div class="search-bar">
        <mat-icon>search</mat-icon>
        <input
          type="text"
          placeholder="Search users by name or email..."
          [(ngModel)]="searchTerm"
        />
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="users" class="data-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>User</th>
            <td mat-cell *matCellDef="let user">
              <div class="user-info">
                <div class="avatar">{{ user.name.charAt(0) }}</div>
                <div>
                  <strong>{{ user.name }}</strong>
                  <p class="text-muted">{{ user.email }}</p>
                </div>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef>Role</th>
            <td mat-cell *matCellDef="let user">{{ user.role }}</td>
          </ng-container>

          <ng-container matColumnDef="booksIssued">
            <th mat-header-cell *matHeaderCellDef>Books Issued</th>
            <td mat-cell *matCellDef="let user">{{ user.booksIssued }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let user">
              <span class="status-badge" [class]="'status-badge--' + user.status">
                {{ user.status | titlecase }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="joinDate">
            <th mat-header-cell *matHeaderCellDef>Joined</th>
            <td mat-cell *matCellDef="let user">{{ user.joinDate | date : 'mediumDate' }}</td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let user">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item><mat-icon>visibility</mat-icon> View Profile</button>
                <button mat-menu-item><mat-icon>edit</mat-icon> Edit</button>
                <button mat-menu-item><mat-icon>block</mat-icon> Suspend</button>
              </mat-menu>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
        <mat-paginator [pageSizeOptions]="[10, 25, 50]" showFirstLastButtons></mat-paginator>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        animation: fadeInUp 0.3s ease-out;
      }
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .page-title {
        font-size: 1.875rem;
        font-weight: 700;
        margin: 0 0 0.25rem;
        color: #0f172a;
      }
      .page-subtitle {
        font-size: 1rem;
        color: #94a3b8;
        margin: 0;
      }
      .stats-row {
        display: flex;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .stat-card {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
        flex: 1;
        min-width: 180px;
      }
      .stat-card mat-icon {
        width: 48px;
        height: 48px;
        font-size: 24px;
        background: #e0e7ff;
        color: #6366f1;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .stat-info {
        display: flex;
        flex-direction: column;
      }
      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
      }
      .stat-label {
        font-size: 0.875rem;
        color: #94a3b8;
      }
      .search-bar {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: #f1f5f9;
        border-radius: 0.75rem;
        margin-bottom: 1.5rem;
      }
      .search-bar mat-icon {
        color: #94a3b8;
      }
      .search-bar input {
        flex: 1;
        border: none;
        background: transparent;
        font-size: 0.875rem;
        outline: none;
      }
      .table-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
        overflow: hidden;
      }
      .data-table {
        width: 100%;
      }
      th.mat-mdc-header-cell {
        background: #f1f5f9;
        font-weight: 600;
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #94a3b8;
        padding: 1rem;
      }
      td.mat-mdc-cell {
        padding: 1rem;
        color: #0f172a;
        border-bottom: 1px solid #e5e7eb;
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .avatar {
        width: 40px;
        height: 40px;
        background: #e0e7ff;
        color: #6366f1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }
      .text-muted {
        font-size: 0.75rem;
        color: #94a3b8;
        margin: 0.25rem 0 0;
      }
      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      .status-badge--active {
        background: rgba(34, 197, 94, 0.15);
        color: #16a34a;
      }
      .status-badge--inactive {
        background: rgba(148, 163, 184, 0.2);
        color: #64748b;
      }
      .status-badge--suspended {
        background: rgba(239, 68, 68, 0.15);
        color: #dc2626;
      }
    `,
  ],
})
export class AdminUsersComponent {
  searchTerm = '';
  displayedColumns = ['name', 'role', 'booksIssued', 'status', 'joinDate', 'actions'];

  users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Member',
      status: 'active',
      booksIssued: 3,
      joinDate: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Member',
      status: 'active',
      booksIssued: 5,
      joinDate: new Date('2023-11-20'),
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Staff',
      status: 'active',
      booksIssued: 0,
      joinDate: new Date('2023-06-10'),
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'Member',
      status: 'inactive',
      booksIssued: 0,
      joinDate: new Date('2022-03-05'),
    },
    {
      id: '5',
      name: 'Robert Brown',
      email: 'robert@example.com',
      role: 'Member',
      status: 'suspended',
      booksIssued: 2,
      joinDate: new Date('2024-02-28'),
    },
  ];
}
