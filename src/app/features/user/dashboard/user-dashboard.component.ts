import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface IssuedBook {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  issueDate: Date;
  dueDate: Date;
  daysLeft: number;
  progress: number;
}

interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss',
})
export class UserDashboardComponent {
  greeting = signal('Good Morning');
  userName = signal('John');

  issuedBooks: IssuedBook[] = [
    {
      id: '1',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      coverColor: '#6366F1',
      issueDate: new Date('2025-01-01'),
      dueDate: new Date('2025-01-15'),
      daysLeft: 8,
      progress: 45,
    },
    {
      id: '2',
      title: 'Design Patterns',
      author: 'Gang of Four',
      coverColor: '#38BDF8',
      issueDate: new Date('2025-01-03'),
      dueDate: new Date('2025-01-17'),
      daysLeft: 10,
      progress: 20,
    },
  ];

  recommendedBooks: RecommendedBook[] = [
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Hunt & Thomas',
      category: 'Programming',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'Refactoring',
      author: 'Martin Fowler',
      category: 'Programming',
      rating: 4.7,
    },
    {
      id: '3',
      title: 'Domain-Driven Design',
      author: 'Eric Evans',
      category: 'Architecture',
      rating: 4.6,
    },
    {
      id: '4',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'Psychology',
      rating: 4.5,
    },
  ];

  recentCategories = ['Programming', 'Design', 'Architecture', 'Business', 'Science'];

  stats = [
    { label: 'Books Read', value: 24, icon: 'menu_book' },
    { label: 'Currently Reading', value: 2, icon: 'auto_stories' },
    { label: 'Wishlist', value: 8, icon: 'favorite' },
  ];

  constructor() {
    this.setGreeting();
  }

  private setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) this.greeting.set('Good Morning');
    else if (hour < 17) this.greeting.set('Good Afternoon');
    else this.greeting.set('Good Evening');
  }

  getDueStatus(daysLeft: number): string {
    if (daysLeft <= 2) return 'urgent';
    if (daysLeft <= 5) return 'soon';
    return 'normal';
  }
}
