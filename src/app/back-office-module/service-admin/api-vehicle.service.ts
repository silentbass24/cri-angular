import { HttpClient  } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { NewVehicle  } from 'src/app/main/model/newVehicle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiVehicleService {

  constructor(private http: HttpClient) { }

  //GET REQUEST veicoli
  onFetchRequestVehicles() {
    return this.http.get<NewVehicle[]>(`${environment.paramUrlBase}/api/getVehicles`)
  }

  //inserimento dati nuovo veicolo
  onPostRequestVehicle(postData: any) {
    let data = JSON.stringify(postData);
    this.http.post(`${environment.paramUrlBase}/api/admin/newVehicle`, data)
      .subscribe(responseData => {
      });
  }

  //get dati per aggiornare veicolo
  updeteVehicle(idVehicle: string) {
    return this.http.get<NewVehicle>(`${environment.paramUrlBase}/api/admin/getVehicle/${idVehicle}`);
  }
  //post dati per aggiornare veicolo
  postUpdateVehicle(postUpdate: any, id: string) {
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/updateVehicle/${id}`, data)
      .subscribe(responseData => {
      });
  }
}
