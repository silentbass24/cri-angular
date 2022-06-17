import { HttpClient      } from '@angular/common/http';
import { Injectable      } from '@angular/core';
import { MedCarService   } from './med-car.service';
import { CheckList       } from '../main/model/checklist';
import { NewItemTemplate } from '../main/model/newItemTemplate';
import { NewVehicleType  } from '../main/model/newVehicleType';
import { environment     } from 'src/environments/environment';
import { NewRole         } from '../main/model/newRole';
import { AlertLevel      } from '../main/model/alertLevel';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  //URL 
  paramUrlBase = environment.paramUrlBase;

  //recupero la lista dei veicoli
  constructor(
    private http: HttpClient,
    public medcarService: MedCarService
  ) { }

  //POST REQUEST CHECKLIST inserimento dati generali checklist 
  onPostRequest(postData: any) {
    let data = JSON.stringify(this.medcarService.resultFormTotal);
    this.http.post(`${this.paramUrlBase}/api/addCheckList`, data)
      .subscribe(responseData => {
      });
  }

  //inserimento dati nuovo item tempalte
  onPostRequestItemTemplate(postData: any) {
    let data = JSON.stringify(postData);
    this.http.post(`${this.paramUrlBase}/api/admin/newTemplate`, data)
      .subscribe(responseData => {
      });
  }

  //inserimento dati nuovo ruolo
  onPostRequestRole(postData: any) {
    let data = JSON.stringify(postData);
    this.http.post(`${environment.paramUrlBase}/api/admin/newRole`, data)
      .subscribe(responseData => {
      });
  }

  //GET REQUEST check list
  onFetchRequestCheckLists() {
    return this.http.get<CheckList[]>(`${this.paramUrlBase}/api/getCheckLists`);
  }
  //GET REQUEST tipi di liste
  onFetchRequestItemsTemplate() {
    return this.http.get<NewItemTemplate[]>(`${this.paramUrlBase}/api/getItemTemplate`);
  }
  //GET REQUEST tipi di veicoli
  onFetchRequestVehicleTypes() {
    return this.http.get<NewVehicleType[]>(`${this.paramUrlBase}/api/getVehicleTypes`);
  }
  //GET REQUEST ruoli degli utenti
  onFetchRequestRoles() {
    return this.http.get<NewRole[]>(`${this.paramUrlBase}/api/getRoles`);
  }
  //GET REQUEST livelli di alert
  onFetchRequestAlertLevels() {
    return this.http.get<AlertLevel[]>(`${this.paramUrlBase}/api/getAlertLevels`);
  }
}
