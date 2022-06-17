import { HttpClient   } from '@angular/common/http';
import { Injectable   } from '@angular/core';
import { NewCommittee } from 'src/app/main/model/newCommittee';
import { environment  } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCommitteeService {

  constructor(private http: HttpClient) { }

  //GET REQUEST comitati
  onFetchRequestCommittee() {
    return this.http.get<NewCommittee[]>(`${environment.paramUrlBase}/api/getCommittee`);
  }

  //inserimento dati nuovo comitato
  onPostRequestCommittee(postData: any) {
    let data = JSON.stringify(postData);
    return this.http.post(`${environment.paramUrlBase}/api/admin/super/newCommittee`, data)
  }

  //get dati per aggiornare comitato
  updeteCommittee(idCommittee: string) {
    return this.http.get<NewCommittee>(`${environment.paramUrlBase}/api/admin/super/getCommittee/${idCommittee}`);
  }
  //post dati per aggiornare comitato
  postUpdateCommittee(postUpdate: any, id: string) {
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/super/updateCommittee/${id}`, data)
      .subscribe(responseData => {
      });
  }
}
