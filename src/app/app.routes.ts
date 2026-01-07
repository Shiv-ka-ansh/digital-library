import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default redirect
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Auth routes
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },

  // Admin routes
  {
    path: 'admin',
    loadComponent: () =>
      import('./layouts/admin-layout/admin-layout.component').then((m) => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'books',
        loadComponent: () =>
          import('./features/admin/books/admin-books.component').then((m) => m.AdminBooksComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/admin/users/admin-users.component').then((m) => m.AdminUsersComponent),
      },
      {
        path: 'issues',
        loadComponent: () =>
          import('./features/admin/issues/admin-issues.component').then(
            (m) => m.AdminIssuesComponent
          ),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/admin/reports/admin-reports.component').then(
            (m) => m.AdminReportsComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/shared/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },

  // User routes
  {
    path: 'user',
    loadComponent: () =>
      import('./layouts/user-layout/user-layout.component').then((m) => m.UserLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/user/dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
      },
      {
        path: 'browse',
        loadComponent: () =>
          import('./features/admin/books/admin-books.component').then((m) => m.AdminBooksComponent),
      },
      {
        path: 'my-books',
        loadComponent: () =>
          import('./features/user/dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./features/admin/issues/admin-issues.component').then(
            (m) => m.AdminIssuesComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./features/user/dashboard/user-dashboard.component').then(
            (m) => m.UserDashboardComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/shared/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/admin/settings/admin-settings.component').then(
            (m) => m.AdminSettingsComponent
          ),
      },
    ],
  },

  // Catch-all redirect
  {
    path: '**',
    redirectTo: 'login',
  },
];
