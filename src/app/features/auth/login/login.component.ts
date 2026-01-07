import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit() {
    // Mark all fields as touched to show validation errors
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);

      const { email } = this.loginForm.value;

      // Demo routing based on email
      if (email.includes('admin')) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }
    }, 1000);
  }

  loginWithGoogle() {
    this.isLoading.set(true);
    // Simulate Google OAuth login
    setTimeout(() => {
      this.isLoading.set(false);
      // Demo: Google login goes to user dashboard
      this.router.navigate(['/user/dashboard']);
    }, 800);
  }

  loginWithSSO() {
    this.isLoading.set(true);
    // Simulate SSO login
    setTimeout(() => {
      this.isLoading.set(false);
      // Demo: SSO login goes to admin dashboard (enterprise users)
      this.router.navigate(['/admin/dashboard']);
    }, 800);
  }
}
