import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVerification } from 'app/shared/model/verification.model';

type EntityResponseType = HttpResponse<IVerification>;
type EntityArrayResponseType = HttpResponse<IVerification[]>;

@Injectable({ providedIn: 'root' })
export class VerificationService {
  public resourceUrl = SERVER_API_URL + 'api/verifications';

  constructor(protected http: HttpClient) {}

  create(verification: IVerification): Observable<EntityResponseType> {
    return this.http.post<IVerification>(this.resourceUrl, verification, { observe: 'response' });
  }

  update(verification: IVerification): Observable<EntityResponseType> {
    return this.http.put<IVerification>(this.resourceUrl, verification, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVerification>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVerification[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
