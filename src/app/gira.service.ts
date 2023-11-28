import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gira, GiraPagination } from './models/GiraModel';
import { Application, ApplicationPagination } from './models/ApplicationModel';
import { GIRA_API } from './app.api';

@Injectable({
  providedIn: 'root'
})
export class GiraService {

  constructor( private http: HttpClient) { }


  //===================================================================================

  getActivesGiras() {
    return this.http.get<Gira[]>(`${GIRA_API}api/gira/active`);
  }

  getGiraById(id: string) {
    return this.http.get<GiraPagination>(`${GIRA_API}api/gira/open/${id}`);
  }

  //===================================================================================

  getApplicationById(applicationId: string) {
    return this.http.get<Application>(`${GIRA_API}api/application-form/application/${applicationId}`);
  }

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
  
  cancelApplication(applicationId: string) {
    return this.http.post<any>(`${GIRA_API}api/application-form/cancel/${applicationId}`, null);
  }
}
