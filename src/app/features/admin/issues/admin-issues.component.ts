import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

interface Issue {
  id: string;
  bookTitle: string;
  userName: string;
  issueDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'overdue' | 'returned';
  fine?: number;
}

@Component({
  selector: 'app-admin-issues',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatMenuModule,
    MatTabsModule,
  ],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Issue Management</h1>
          <p class="page-subtitle">Track book issues, returns, and overdue items</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          New Issue
        </button>
      </header>

      <mat-tab-group>
        <mat-tab label="Active ({{ activeIssues.length }})">
          <div class="tab-content">
            <div class="table-container">
              <table mat-table [dataSource]="activeIssues" class="data-table">
                <ng-container matColumnDef="book">
                  <th mat-header-cell *matHeaderCellDef>Book</th>
                  <td mat-cell *matCellDef="let issue">{{ issue.bookTitle }}</td>
                </ng-container>
                <ng-container matColumnDef="user">
                  <th mat-header-cell *matHeaderCellDef>User</th>
                  <td mat-cell *matCellDef="let issue">{{ issue.userName }}</td>
                </ng-container>
                <ng-container matColumnDef="issueDate">
                  <th mat-header-cell *matHeaderCellDef>Issue Date</th>
                  <td mat-cell *matCellDef="let issue">
                    {{ issue.issueDate | date : 'mediumDate' }}
                  </td>
                </ng-container>
                <ng-container matColumnDef="dueDate">
                  <th mat-header-cell *matHeaderCellDef>Due Date</th>
                  <td mat-cell *matCellDef="let issue">
                    {{ issue.dueDate | date : 'mediumDate' }}
                  </td>
                </ng-container>
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let issue">
                    <span class="status-badge status-badge--active">Active</span>
                  </td>
                </ng-container>
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let issue">
                    <button mat-stroked-button color="primary">
                      <mat-icon>replay</mat-icon> Return
                    </button>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
              </table>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="Overdue ({{ overdueIssues.length }})">
          <div class="tab-content">
            <div class="alert alert--warning">
              <mat-icon>warning</mat-icon>
              <span>There are {{ overdueIssues.length }} overdue books requiring attention.</span>
            </div>
            <div class="table-container">
              <table mat-table [dataSource]="overdueIssues" class="data-table">
                <ng-container matColumnDef="book">
                  <th mat-header-cell *matHeaderCellDef>Book</th>
                  <td mat-cell *matCellDef="let issue">{{ issue.bookTitle }}</td>
                </ng-container>
                <ng-container matColumnDef="user">
                  <th mat-header-cell *matHeaderCellDef>User</th>
                  <td mat-cell *matCellDef="let issue">{{ issue.userName }}</td>
                </ng-container>
                <ng-container matColumnDef="issueDate">
                  <th mat-header-cell *matHeaderCellDef>Issue Date</th>
                  <td mat-cell *matCellDef="let issue">
                    {{ issue.issueDate | date : 'mediumDate' }}
                  </td>
                </ng-container>
                <ng-container matColumnDef="dueDate">
                  <th mat-header-cell *matHeaderCellDef>Due Date</th>
                  <td mat-cell *matCellDef="let issue" class="text-error">
                    {{ issue.dueDate | date : 'mediumDate' }}
                  </td>
                </ng-container>
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Fine</th>
                  <td mat-cell *matCellDef="let issue">
                    <span class="fine-badge">₹{{ issue.fine }}</span>
                  </td>
                </ng-container>
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let issue">
                    <button mat-stroked-button color="warn">
                      <mat-icon>replay</mat-icon> Return + Pay Fine
                    </button>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
              </table>
            </div>
          </div>
        </mat-tab>

        <mat-tab label="History">
          <div class="tab-content">
            <div class="table-container">
              <table mat-table [dataSource]="returnedIssues" class="data-table">
                <ng-container matColumnDef="book">
                  <th mat-header-cell *matHeaderCellDef>Book</th>
                  <td mat-cell *matCellDef="let issue">{{ issue.bookTitle }}</td>
                </ng-container>
                <ng-container matColumnDef="user">
                  <th mat-header-cell *matHeaderCellDef>User</th>
                  <td mat-cell *matCellDef="let issue">{{ issue.userName }}</td>
                </ng-container>
                <ng-container matColumnDef="issueDate">
                  <th mat-header-cell *matHeaderCellDef>Issue Date</th>
                  <td mat-cell *matCellDef="let issue">
                    {{ issue.issueDate | date : 'mediumDate' }}
                  </td>
                </ng-container>
                <ng-container matColumnDef="dueDate">
                  <th mat-header-cell *matHeaderCellDef>Return Date</th>
                  <td mat-cell *matCellDef="let issue">
                    {{ issue.returnDate | date : 'mediumDate' }}
                  </td>
                </ng-container>
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let issue">
                    <span class="status-badge status-badge--returned">Returned</span>
                  </td>
                </ng-container>
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef></th>
                  <td mat-cell *matCellDef="let issue">
                    <button mat-icon-button><mat-icon>visibility</mat-icon></button>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
              </table>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
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
      .tab-content {
        padding: 1.5rem 0;
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
      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      .status-badge--active {
        background: rgba(99, 102, 241, 0.12);
        color: #6366f1;
      }
      .status-badge--overdue {
        background: rgba(239, 68, 68, 0.15);
        color: #dc2626;
      }
      .status-badge--returned {
        background: rgba(34, 197, 94, 0.15);
        color: #16a34a;
      }
      .fine-badge {
        background: rgba(239, 68, 68, 0.15);
        color: #dc2626;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 600;
      }
      .text-error {
        color: #ef4444;
        font-weight: 500;
      }
      .alert {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        border-radius: 0.75rem;
        margin-bottom: 1rem;
      }
      .alert--warning {
        background: rgba(250, 204, 21, 0.15);
        color: #a16207;
      }
    `,
  ],
})
export class AdminIssuesComponent {
  displayedColumns = ['book', 'user', 'issueDate', 'dueDate', 'status', 'actions'];

  activeIssues: Issue[] = [
    {
      id: '1',
      bookTitle: 'Clean Code',
      userName: 'John Doe',
      issueDate: new Date('2025-01-01'),
      dueDate: new Date('2025-01-15'),
      status: 'active',
    },
    {
      id: '2',
      bookTitle: 'The Pragmatic Programmer',
      userName: 'Mike Johnson',
      issueDate: new Date('2025-01-02'),
      dueDate: new Date('2025-01-16'),
      status: 'active',
    },
  ];

  overdueIssues: Issue[] = [
    {
      id: '3',
      bookTitle: 'Design Patterns',
      userName: 'Jane Smith',
      issueDate: new Date('2024-12-20'),
      dueDate: new Date('2025-01-03'),
      status: 'overdue',
      fine: 50,
    },
    {
      id: '4',
      bookTitle: 'Domain-Driven Design',
      userName: 'Robert Brown',
      issueDate: new Date('2024-12-15'),
      dueDate: new Date('2024-12-29'),
      status: 'overdue',
      fine: 150,
    },
  ];

  returnedIssues: Issue[] = [
    {
      id: '5',
      bookTitle: 'Refactoring',
      userName: 'Sarah Wilson',
      issueDate: new Date('2024-12-28'),
      dueDate: new Date('2025-01-05'),
      returnDate: new Date('2025-01-04'),
      status: 'returned',
    },
  ];
}
