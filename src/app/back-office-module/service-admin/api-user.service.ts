import { HttpClient  } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { NewRescuer  } from 'src/app/main/model/newRescuer';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) { }

  //GET REQUEST utenti
  onFetchRequestUsers() {
    return this.http.get<NewRescuer[]>(`${environment.paramUrlBase}/api/getUsers`);
  }

  //inserimento dati nuovo utente
  onPostRequestUser(postData: any) {
    let data = JSON.stringify(postData);
    return this.http.post(`${environment.paramUrlBase}/api/admin/newUser`, data);
  }

  //get dati per aggiornare utente
  updeteUser(idUser: string) {
    return this.http.get<NewRescuer>(`${environment.paramUrlBase}/api/admin/getUser/${idUser}`);
  }
  //post dati per aggiornare utente
  postUpdateUser(postUpdate: any, id: string) {
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/updateUser/${id}`, data)
    .subscribe(responseData => {
    });
  }

  postUpdateUserRole(postUpdate: any) {
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/newUserRole`, data)
    .subscribe(responseData => {
    });
  }

  postDeleteUserRole(postUpdate: any) {
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/deleteUserRole`, data)
    .subscribe(responseData => {
    });
  }
}

