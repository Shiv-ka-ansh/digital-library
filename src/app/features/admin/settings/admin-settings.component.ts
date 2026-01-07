import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSlideToggleModule, MatDividerModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your library system settings</p>
      </header>

      <div class="settings-grid">
        <div class="settings-card">
          <h2 class="settings-title"><mat-icon>library_books</mat-icon> Library Settings</h2>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Maximum Books Per User</h3>
              <p>Set the limit for books a user can borrow at once</p>
            </div>
            <input type="number" class="setting-input" value="5" />
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Default Loan Period (Days)</h3>
              <p>Default number of days for book loans</p>
            </div>
            <input type="number" class="setting-input" value="14" />
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Fine Per Day (₹)</h3>
              <p>Fine amount for each overdue day</p>
            </div>
            <input type="number" class="setting-input" value="10" />
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Allow Renewals</h3>
              <p>Allow users to renew their book loans</p>
            </div>
            <mat-slide-toggle [checked]="true"></mat-slide-toggle>
          </div>
        </div>

        <div class="settings-card">
          <h2 class="settings-title"><mat-icon>notifications</mat-icon> Notifications</h2>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Email Notifications</h3>
              <p>Send email reminders for due dates</p>
            </div>
            <mat-slide-toggle [checked]="true"></mat-slide-toggle>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Overdue Alerts</h3>
              <p>Get notified about overdue books</p>
            </div>
            <mat-slide-toggle [checked]="true"></mat-slide-toggle>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>New Book Alerts</h3>
              <p>Notify users about new additions</p>
            </div>
            <mat-slide-toggle [checked]="false"></mat-slide-toggle>
          </div>
        </div>

        <div class="settings-card">
          <h2 class="settings-title"><mat-icon>palette</mat-icon> Appearance</h2>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Library Name</h3>
              <p>Displayed in the header and reports</p>
            </div>
            <input
              type="text"
              class="setting-input setting-input--wide"
              value="DigiLib Central Library"
            />
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <h3>Show Welcome Banner</h3>
              <p>Display welcome message on dashboard</p>
            </div>
            <mat-slide-toggle [checked]="true"></mat-slide-toggle>
          </div>
        </div>
      </div>

      <div class="action-bar">
        <button mat-stroked-button>Cancel</button>
        <button mat-raised-button color="primary">Save Changes</button>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container {
        animation: fadeInUp 0.3s ease-out;
      }
      .page-header {
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
      .settings-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .settings-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
      }
      .settings-title {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.125rem;
        font-weight: 600;
        color: #0f172a;
        margin: 0 0 1.5rem;
      }
      .settings-title mat-icon {
        color: #6366f1;
      }
      .setting-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #f1f5f9;
      }
      .setting-item:last-child {
        border-bottom: none;
      }
      .setting-info h3 {
        font-size: 0.9375rem;
        font-weight: 500;
        color: #0f172a;
        margin: 0 0 0.25rem;
      }
      .setting-info p {
        font-size: 0.8125rem;
        color: #94a3b8;
        margin: 0;
      }
      .setting-input {
        padding: 0.5rem 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        width: 100px;
        text-align: center;
      }
      .setting-input--wide {
        width: 250px;
        text-align: left;
      }
      .action-bar {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
      }
    `,
  ],
})
export class AdminSettingsComponent {}
