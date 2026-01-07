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
  selector: 'app-admin-layout',
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
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent implements OnInit {
  isCollapsed = signal(false);
  currentRoute = signal('');

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Books', icon: 'menu_book', route: '/admin/books' },
    { label: 'Users', icon: 'people', route: '/admin/users' },
    { label: 'Issues', icon: 'swap_horiz', route: '/admin/issues', badge: 3 },
    { label: 'Reports', icon: 'assessment', route: '/admin/reports' },
    { label: 'Settings', icon: 'settings', route: '/admin/settings' },
  ];

  sidebarWidth = computed(() => (this.isCollapsed() ? '72px' : '280px'));

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
    // Implement logout logic
    this.router.navigate(['/login']);
  }
}
