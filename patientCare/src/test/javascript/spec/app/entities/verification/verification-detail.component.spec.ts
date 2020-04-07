import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PatientCareTestModule } from '../../../test.module';
import { VerificationDetailComponent } from 'app/entities/verification/verification-detail.component';
import { Verification } from 'app/shared/model/verification.model';

describe('Component Tests', () => {
  describe('Verification Management Detail Component', () => {
    let comp: VerificationDetailComponent;
    let fixture: ComponentFixture<VerificationDetailComponent>;
    const route = ({ data: of({ verification: new Verification(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientCareTestModule],
        declarations: [VerificationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(VerificationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VerificationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load verification on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.verification).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
