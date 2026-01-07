import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDividerModule,
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss',
})
export class UserLayoutComponent implements OnInit {
  isCollapsed = signal(false);
  currentRoute = signal('');

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/user/dashboard' },
    { label: 'Browse Books', icon: 'search', route: '/user/browse' },
    { label: 'My Books', icon: 'bookmark', route: '/user/my-books', badge: 2 },
    { label: 'History', icon: 'history', route: '/user/history' },
    { label: 'Wishlist', icon: 'favorite_border', route: '/user/wishlist' },
    { label: 'Profile', icon: 'person', route: '/user/profile' },
  ];

  sidebarWidth = computed(() => (this.isCollapsed() ? '72px' : '260px'));

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentRoute.set(this.router.url);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.urlAfterRedirects);
      });
  }

  toggleSidebar() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  isActive(route: string): boolean {
    return this.currentRoute().startsWith(route);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
