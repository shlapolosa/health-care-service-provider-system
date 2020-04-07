import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IVerification, Verification } from 'app/shared/model/verification.model';
import { VerificationService } from './verification.service';

@Component({
  selector: 'jhi-verification-update',
  templateUrl: './verification-update.component.html'
})
export class VerificationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    type: [null, [Validators.required]],
    details: [null, [Validators.required]]
  });

  constructor(protected verificationService: VerificationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ verification }) => {
      this.updateForm(verification);
    });
  }

  updateForm(verification: IVerification): void {
    this.editForm.patchValue({
      id: verification.id,
      type: verification.type,
      details: verification.details
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const verification = this.createFromForm();
    if (verification.id !== undefined) {
      this.subscribeToSaveResponse(this.verificationService.update(verification));
    } else {
      this.subscribeToSaveResponse(this.verificationService.create(verification));
    }
  }

  private createFromForm(): IVerification {
    return {
      ...new Verification(),
      id: this.editForm.get(['id'])!.value,
      type: this.editForm.get(['type'])!.value,
      details: this.editForm.get(['details'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVerification>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
