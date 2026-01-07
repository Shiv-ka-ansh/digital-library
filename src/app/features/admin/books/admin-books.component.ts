import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  copies: number;
  available: number;
  status: 'available' | 'low-stock' | 'out-of-stock';
}

@Component({
  selector: 'app-admin-books',
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
          <h1 class="page-title">Books Management</h1>
          <p class="page-subtitle">Manage your library's book collection</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>add</mat-icon>
          Add New Book
        </button>
      </header>

      <div class="search-bar">
        <mat-icon>search</mat-icon>
        <input
          type="text"
          placeholder="Search books by title, author, or ISBN..."
          [(ngModel)]="searchTerm"
        />
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="books" class="data-table">
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef>Title</th>
            <td mat-cell *matCellDef="let book">
              <div class="book-info">
                <div class="book-cover">
                  <mat-icon>menu_book</mat-icon>
                </div>
                <div>
                  <strong>{{ book.title }}</strong>
                  <p class="text-muted">{{ book.author }}</p>
                </div>
              </div>
            </td>
          </ng-container>

          <ng-container matColumnDef="isbn">
            <th mat-header-cell *matHeaderCellDef>ISBN</th>
            <td mat-cell *matCellDef="let book">{{ book.isbn }}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Category</th>
            <td mat-cell *matCellDef="let book">
              <span class="category-chip">{{ book.category }}</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="copies">
            <th mat-header-cell *matHeaderCellDef>Copies</th>
            <td mat-cell *matCellDef="let book">{{ book.available }}/{{ book.copies }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let book">
              <span class="status-badge" [class]="'status-badge--' + book.status">
                {{ book.status | titlecase }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let book">
              <button mat-icon-button [matMenuTriggerFor]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu #menu="matMenu">
                <button mat-menu-item><mat-icon>edit</mat-icon> Edit</button>
                <button mat-menu-item><mat-icon>visibility</mat-icon> View</button>
                <button mat-menu-item><mat-icon>delete</mat-icon> Delete</button>
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
      .book-info {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .book-cover {
        width: 40px;
        height: 50px;
        background: #e0e7ff;
        color: #6366f1;
        border-radius: 0.375rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .text-muted {
        font-size: 0.75rem;
        color: #94a3b8;
        margin: 0.25rem 0 0;
      }
      .category-chip {
        padding: 0.25rem 0.75rem;
        background: #f1f5f9;
        border-radius: 999px;
        font-size: 0.75rem;
        color: #475569;
      }
      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 500;
      }
      .status-badge--available {
        background: rgba(34, 197, 94, 0.15);
        color: #16a34a;
      }
      .status-badge--low-stock {
        background: rgba(250, 204, 21, 0.2);
        color: #a16207;
      }
      .status-badge--out-of-stock {
        background: rgba(239, 68, 68, 0.15);
        color: #dc2626;
      }
    `,
  ],
})
export class AdminBooksComponent {
  searchTerm = '';
  displayedColumns = ['title', 'isbn', 'category', 'copies', 'status', 'actions'];

  books: Book[] = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '978-0132350884',
      category: 'Programming',
      copies: 5,
      available: 3,
      status: 'available',
    },
    {
      id: '2',
      title: 'Design Patterns',
      author: 'Gang of Four',
      isbn: '978-0201633610',
      category: 'Programming',
      copies: 3,
      available: 1,
      status: 'low-stock',
    },
    {
      id: '3',
      title: 'The Pragmatic Programmer',
      author: 'Hunt & Thomas',
      isbn: '978-0135957059',
      category: 'Programming',
      copies: 4,
      available: 0,
      status: 'out-of-stock',
    },
    {
      id: '4',
      title: 'Refactoring',
      author: 'Martin Fowler',
      isbn: '978-0134757599',
      category: 'Programming',
      copies: 2,
      available: 2,
      status: 'available',
    },
    {
      id: '5',
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      isbn: '978-0321125217',
      category: 'Architecture',
      copies: 3,
      available: 2,
      status: 'available',
    },
  ];
}
