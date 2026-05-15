import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppEnvironment } from '../../../../core/config/app-environment';
import { logError, logInfo } from '../../../../core/errors/logger/logger';
import { NonFieldErrors } from '../../../../shared/forms/errors/non-field-errors/non-field-errors';
import { FormIconPosition } from '../../../../shared/forms/form-icon-position.enum';
import { FormState } from '../../../../shared/forms/form-state.model';
import { FormInput } from '../../../../shared/forms/inputs/form-input/form-input';
import { FormInputType } from '../../../../shared/forms/inputs/form-input/form-input.type';
import { LoginResponse } from '../../contracts/responses/login.response';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'vrm-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatCardModule, FormInput, NonFieldErrors],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authApiService = inject(AuthApiService);

  protected readonly formInputTypes = FormInputType;
  protected readonly iconPositions = FormIconPosition;
  protected readonly siteName = AppEnvironment.SiteName;

  readonly formState: FormState = {
    form: this.fb.group({}),
    problemDetails: undefined,
    isSubmitted: false,
    isLoading: false,
  };

  ngOnInit(): void {
    this.buildForm();
  }

  protected handleSubmit(): void {
    this.formState.isSubmitted = true;

    if (this.formState.form.invalid) {
      this.formState.form.markAllAsTouched();

      return;
    }

    const loginResponse = this.formState.form.value;

    this.authApiService
      .login(loginResponse)
      .pipe()
      .subscribe({
        next: (response: LoginResponse) => {
          logInfo('Login successful', response);
        },
        error: (error: HttpErrorResponse) => {
          this.formState.problemDetails = error.error;
          logError('Login failed', error);
        },
      });
  }

  private buildForm(): void {
    this.formState.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
}
