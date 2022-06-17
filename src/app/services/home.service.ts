import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HomeForm   } from '../main/model/homeForm';
import { NewVehicle } from '../main/model/newVehicle';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  resultHomeForm: HomeForm [] = [];
  avanti: boolean;
  avantiDisabile: boolean = false;
  numeroSocc: number = 0;
  vehicleObj: NewVehicle;
  activateSubmit = false;
  isAdmin = false;

  constructor(private http: HttpClient) {}

  shiftOptions = [{label:'Mattina', value: 'Mattina'} , {label:'Pomeriggio', value: "Pomeriggio"}, {label:'Notte', value: "Notte"}];

  getVehicleType(vehicletypeId: string) {
		if (vehicletypeId === '1052893b-6d35-4c8b-9740-8409c18d9581') {
		  return "Automedica"
		} else {
		  return "Autoambulanza"
		}
	}

  optionsCarburante = [
    {
      name: "vuoto",
      value: "vuoto",
      alertLevel: '9d6b439f-4d62-4d22-a8c3-937938035bf0'
    },
    {
      name: "1/4",
      value: "1/4",
      alertLevel: '9d6b439f-4d62-4d22-a8c3-937938035bf0'
    },
    {
      name: "1/2",
      value: "1/2",
      alertLevel: '45bd7cc1-429d-4a17-89d1-0012f2c41474'
    },
    {
      name: "3/4",
      value: "3/4",
      alertLevel: '45bd7cc1-429d-4a17-89d1-0012f2c41474'
    },
    {
      name: "pieno",
      value: "pieno",
      alertLevel: '220f01ee-f939-40d2-bda3-5d69a0dc44fd'
    }
  ];

  userAuthorization() {
    return this.http.get(`${environment.paramUrlBase}/api/checkUser`);
  }
}
