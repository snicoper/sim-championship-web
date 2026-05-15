import { FormGroup } from '@angular/forms';
import { ProblemDetailsResponse } from '../../core/http/problem-detailt.response';

export interface FormState<TForm extends FormGroup = FormGroup> {
  form: TForm;
  problemDetails?: ProblemDetailsResponse;
  isSubmitted: boolean;
  isLoading: boolean;
}
