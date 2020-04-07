import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVerification } from 'app/shared/model/verification.model';

@Component({
  selector: 'jhi-verification-detail',
  templateUrl: './verification-detail.component.html'
})
export class VerificationDetailComponent implements OnInit {
  verification: IVerification | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ verification }) => (this.verification = verification));
  }

  previousState(): void {
    window.history.back();
  }
}
