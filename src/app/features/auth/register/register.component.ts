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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      agreeTerms: [false, [Validators.requiredTrue]],
    });
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    // Simulate API call
    setTimeout(() => {
      this.isLoading.set(false);
      // After registration, redirect to login
      this.router.navigate(['/login']);
    }, 1500);
  }

  signUpWithGoogle() {
    this.isLoading.set(true);
    // Simulate Google OAuth signup
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/user/dashboard']);
    }, 800);
  }

  signUpWithSSO() {
    this.isLoading.set(true);
    // Simulate SSO signup
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/admin/dashboard']);
    }, 800);
  }
}
