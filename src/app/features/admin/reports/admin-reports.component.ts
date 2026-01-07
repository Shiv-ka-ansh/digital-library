import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatSelectModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div>
          <h1 class="page-title">Reports & Analytics</h1>
          <p class="page-subtitle">View library statistics and generate reports</p>
        </div>
        <div class="header-actions">
          <select class="period-select">
            <option>Last 7 days</option>
            <option selected>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button mat-raised-button color="primary">
            <mat-icon>download</mat-icon>
            Export PDF
          </button>
        </div>
      </header>

      <div class="stats-grid">
        <div class="stat-card stat-card--primary">
          <div class="stat-icon"><mat-icon>menu_book</mat-icon></div>
          <div class="stat-content">
            <span class="stat-value">1,248</span>
            <span class="stat-label">Books Issued</span>
            <span class="stat-change positive">+12% from last month</span>
          </div>
        </div>
        <div class="stat-card stat-card--success">
          <div class="stat-icon"><mat-icon>replay</mat-icon></div>
          <div class="stat-content">
            <span class="stat-value">1,156</span>
            <span class="stat-label">Books Returned</span>
            <span class="stat-change positive">+8% from last month</span>
          </div>
        </div>
        <div class="stat-card stat-card--warning">
          <div class="stat-icon"><mat-icon>person_add</mat-icon></div>
          <div class="stat-content">
            <span class="stat-value">89</span>
            <span class="stat-label">New Members</span>
            <span class="stat-change positive">+23% from last month</span>
          </div>
        </div>
        <div class="stat-card stat-card--error">
          <div class="stat-icon"><mat-icon>attach_money</mat-icon></div>
          <div class="stat-content">
            <span class="stat-value">₹4,850</span>
            <span class="stat-label">Fines Collected</span>
            <span class="stat-change negative">-5% from last month</span>
          </div>
        </div>
      </div>

      <div class="report-grid">
        <mat-card class="report-card">
          <mat-card-header>
            <mat-card-title>Top Borrowed Books</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="rank-list">
              @for (book of topBooks; track book.title) {
              <div class="rank-item">
                <span class="rank-number">{{ $index + 1 }}</span>
                <span class="rank-title">{{ book.title }}</span>
                <span class="rank-count">{{ book.count }} issues</span>
              </div>
              }
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="report-card">
          <mat-card-header>
            <mat-card-title>Category Distribution</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="category-bars">
              @for (cat of categories; track cat.name) {
              <div class="category-item">
                <div class="category-header">
                  <span>{{ cat.name }}</span>
                  <span>{{ cat.percentage }}%</span>
                </div>
                <div class="category-bar">
                  <div class="category-fill" [style.width.%]="cat.percentage"></div>
                </div>
              </div>
              }
            </div>
          </mat-card-content>
        </mat-card>
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
      .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      .period-select {
        padding: 0.5rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        background: white;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.25rem;
        margin-bottom: 2rem;
      }
      @media (max-width: 1279px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 767px) {
        .stats-grid {
          grid-template-columns: 1fr;
        }
      }
      .stat-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
      }
      .stat-icon {
        width: 56px;
        height: 56px;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .stat-card--primary .stat-icon {
        background: #e0e7ff;
        color: #6366f1;
      }
      .stat-card--success .stat-icon {
        background: rgba(34, 197, 94, 0.15);
        color: #22c55e;
      }
      .stat-card--warning .stat-icon {
        background: rgba(250, 204, 21, 0.2);
        color: #eab308;
      }
      .stat-card--error .stat-icon {
        background: rgba(239, 68, 68, 0.15);
        color: #ef4444;
      }
      .stat-content {
        display: flex;
        flex-direction: column;
      }
      .stat-value {
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a;
      }
      .stat-label {
        font-size: 0.875rem;
        color: #64748b;
      }
      .stat-change {
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }
      .stat-change.positive {
        color: #22c55e;
      }
      .stat-change.negative {
        color: #ef4444;
      }
      .report-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
      @media (max-width: 1023px) {
        .report-grid {
          grid-template-columns: 1fr;
        }
      }
      .report-card {
        border-radius: 1rem !important;
      }
      .rank-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
      }
      .rank-item {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .rank-number {
        width: 28px;
        height: 28px;
        background: #f1f5f9;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
        color: #64748b;
      }
      .rank-item:first-child .rank-number {
        background: rgba(250, 204, 21, 0.3);
        color: #a16207;
      }
      .rank-title {
        flex: 1;
        font-weight: 500;
      }
      .rank-count {
        font-size: 0.75rem;
        color: #6366f1;
        background: #e0e7ff;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
      }
      .category-bars {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
      }
      .category-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .category-header {
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #475569;
      }
      .category-bar {
        height: 8px;
        background: #f1f5f9;
        border-radius: 4px;
        overflow: hidden;
      }
      .category-fill {
        height: 100%;
        background: linear-gradient(90deg, #6366f1, #818cf8);
        border-radius: 4px;
      }
    `,
  ],
})
export class AdminReportsComponent {
  topBooks = [
    { title: 'Clean Code', count: 48 },
    { title: 'Design Patterns', count: 42 },
    { title: 'The Pragmatic Programmer', count: 38 },
    { title: 'Refactoring', count: 35 },
    { title: 'Domain-Driven Design', count: 32 },
  ];

  categories = [
    { name: 'Programming', percentage: 45 },
    { name: 'Fiction', percentage: 22 },
    { name: 'Business', percentage: 15 },
    { name: 'Science', percentage: 10 },
    { name: 'Other', percentage: 8 },
  ];
}
