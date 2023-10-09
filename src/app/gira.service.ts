import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GiraPagination } from './models/GiraModel';
import { ApplicationPagination } from './models/ApplicationModel';
import { GIRA_API } from './app.api';

@Injectable({
  providedIn: 'root'
})
export class GiraService {

  constructor( private http: HttpClient) { }


  //===================================================================================

  getOpenGiras() {
    return this.http.get<GiraPagination>(`${GIRA_API}api/gira`);
  }

  getActivesGiras() {
    return this.http.get<GiraPagination>(`${GIRA_API}api/gira/active`);
  }

  getGiraNameById(id: string) {
    return this.http.get<GiraPagination>(`${GIRA_API}api/gira/name/${id}`);
  }

  //===================================================================================

  createApplication(body: any) {
    return this.http.post<any>(`${GIRA_API}api/application-form`, body);
  }

  createApplicationV2(body: any) {
    return this.http.post<any>(`${GIRA_API}api/v2/application-form`, body);
  }

  getApplicationsByGiraId(giraId: string, filter: string) {
    return this.http.get<ApplicationPagination>(`${GIRA_API}api/application-form/${giraId}`, {
      params: {
        filter: filter
      }
    });
  }
}
