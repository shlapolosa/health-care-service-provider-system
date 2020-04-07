import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PatientCareTestModule } from '../../../test.module';
import { VerificationComponent } from 'app/entities/verification/verification.component';
import { VerificationService } from 'app/entities/verification/verification.service';
import { Verification } from 'app/shared/model/verification.model';

describe('Component Tests', () => {
  describe('Verification Management Component', () => {
    let comp: VerificationComponent;
    let fixture: ComponentFixture<VerificationComponent>;
    let service: VerificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientCareTestModule],
        declarations: [VerificationComponent]
      })
        .overrideTemplate(VerificationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VerificationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VerificationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Verification(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.verifications && comp.verifications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
