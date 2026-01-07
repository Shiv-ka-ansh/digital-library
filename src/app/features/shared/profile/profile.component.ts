import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Profile Settings</h1>
        <p class="page-subtitle">Manage your account information</p>
      </header>

      <div class="profile-layout">
        <div class="profile-card profile-avatar-card">
          <div class="avatar-section">
            <div class="avatar-large">AD</div>
            <h2 class="profile-name">Admin User</h2>
            <p class="profile-role">System Administrator</p>
            <button mat-stroked-button>
              <mat-icon>photo_camera</mat-icon>
              Change Photo
            </button>
          </div>
        </div>

        <div class="profile-card profile-info-card">
          <h3 class="card-title">Personal Information</h3>

          <div class="form-row">
            <mat-form-field appearance="outline">
              <mat-label>First Name</mat-label>
              <input matInput value="Admin" />
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Last Name</mat-label>
              <input matInput value="User" />
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email Address</mat-label>
            <input matInput value="admin@digilib.com" type="email" />
            <mat-icon matSuffix>mail</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput value="+91 98765 43210" type="tel" />
            <mat-icon matSuffix>phone</mat-icon>
          </mat-form-field>

          <div class="action-buttons">
            <button mat-raised-button color="primary">Save Changes</button>
          </div>
        </div>

        <div class="profile-card">
          <h3 class="card-title">Security</h3>

          <div class="security-item">
            <div class="security-info">
              <mat-icon>lock</mat-icon>
              <div>
                <h4>Password</h4>
                <p>Last changed 30 days ago</p>
              </div>
            </div>
            <button mat-stroked-button>Change Password</button>
          </div>

          <div class="security-item">
            <div class="security-info">
              <mat-icon>security</mat-icon>
              <div>
                <h4>Two-Factor Authentication</h4>
                <p>Add an extra layer of security</p>
              </div>
            </div>
            <button mat-stroked-button color="primary">Enable</button>
          </div>
        </div>
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
      .profile-layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 1.5rem;
      }
      @media (max-width: 1023px) {
        .profile-layout {
          grid-template-columns: 1fr;
        }
      }
      .profile-card {
        background: white;
        border-radius: 1rem;
        padding: 1.5rem;
        box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
      }
      .profile-avatar-card {
        grid-row: span 2;
      }
      .avatar-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 1rem 0;
      }
      .avatar-large {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #6366f1, #818cf8);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      .profile-name {
        font-size: 1.25rem;
        font-weight: 600;
        color: #0f172a;
        margin: 0 0 0.25rem;
      }
      .profile-role {
        font-size: 0.875rem;
        color: #94a3b8;
        margin: 0 0 1.5rem;
      }
      .card-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #0f172a;
        margin: 0 0 1.5rem;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
      .full-width {
        width: 100%;
      }
      .action-buttons {
        margin-top: 1rem;
      }
      .security-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #f1f5f9;
      }
      .security-item:last-child {
        border-bottom: none;
      }
      .security-info {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .security-info mat-icon {
        width: 40px;
        height: 40px;
        background: #f1f5f9;
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6366f1;
        font-size: 20px;
      }
      .security-info h4 {
        font-size: 0.9375rem;
        font-weight: 500;
        color: #0f172a;
        margin: 0 0 0.25rem;
      }
      .security-info p {
        font-size: 0.8125rem;
        color: #94a3b8;
        margin: 0;
      }
    `,
  ],
})
export class ProfileComponent {}
