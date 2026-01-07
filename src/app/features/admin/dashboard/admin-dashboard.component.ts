import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

interface RecentIssue {
  id: string;
  bookTitle: string;
  userName: string;
  issueDate: Date;
  dueDate: Date;
  status: 'active' | 'overdue' | 'returned';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  selectedPeriod = signal('January 2025');

  periodOptions = [
    'Today',
    'Last 7 Days',
    'Last 30 Days',
    'January 2025',
    'December 2024',
    'November 2024',
    'This Year',
  ];

  selectPeriod(period: string) {
    this.selectedPeriod.set(period);
  }

  stats: StatCard[] = [
    {
      title: 'Total Books',
      value: '12,458',
      change: '+124 this month',
      trend: 'up',
      icon: 'menu_book',
      color: 'primary',
    },
    {
      title: 'Active Issues',
      value: '892',
      change: '+38 today',
      trend: 'up',
      icon: 'swap_horiz',
      color: 'secondary',
    },
    {
      title: 'Overdue Books',
      value: '23',
      change: '-5 from last week',
      trend: 'down',
      icon: 'warning',
      color: 'error',
    },
    {
      title: 'Total Users',
      value: '3,241',
      change: '+89 this month',
      trend: 'up',
      icon: 'people',
      color: 'success',
    },
  ];

  displayedColumns = ['bookTitle', 'userName', 'issueDate', 'dueDate', 'status', 'actions'];

  recentIssues: RecentIssue[] = [
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
      bookTitle: 'Design Patterns',
      userName: 'Jane Smith',
      issueDate: new Date('2024-12-20'),
      dueDate: new Date('2025-01-03'),
      status: 'overdue',
    },
    {
      id: '3',
      bookTitle: 'The Pragmatic Programmer',
      userName: 'Mike Johnson',
      issueDate: new Date('2025-01-02'),
      dueDate: new Date('2025-01-16'),
      status: 'active',
    },
    {
      id: '4',
      bookTitle: 'Refactoring',
      userName: 'Sarah Wilson',
      issueDate: new Date('2024-12-28'),
      dueDate: new Date('2025-01-05'),
      status: 'returned',
    },
    {
      id: '5',
      bookTitle: 'Domain-Driven Design',
      userName: 'Robert Brown',
      issueDate: new Date('2024-12-15'),
      dueDate: new Date('2024-12-29'),
      status: 'overdue',
    },
  ];

  quickActions = [
    { label: 'Add Book', icon: 'add', route: '/admin/books/add' },
    { label: 'Issue Book', icon: 'swap_horiz', route: '/admin/issues/new' },
    { label: 'Add User', icon: 'person_add', route: '/admin/users/add' },
    { label: 'Generate Report', icon: 'assessment', route: '/admin/reports' },
  ];

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'primary',
      overdue: 'warn',
      returned: 'accent',
    };
    return colors[status] || 'primary';
  }
}
