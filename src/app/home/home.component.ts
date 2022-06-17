import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { WDModalSearchService } from '../modules/ngcomponents/search/modalsearchservice/modal-search.service';
import { ApiVehicleService    } from '../back-office-module/service-admin/api-vehicle.service';
import { HomeService  } from '../services/home.service';
import { OptionList   } from '../main/model/options';
import { HomeForm     } from '../main/model/homeForm';
import { NewRescuer   } from '../main/model/newRescuer';
import { NewVehicle   } from '../main/model/newVehicle';
import { FieldTextComponent } from '../modules/ngcomponents/formfields/field-text/field-text.component';
import { SearchFieldDTO     } from '../modules/ngcomponents/search/models/searchfield-definition-DTO';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  buttonClass: string;

  today = new Date();
  hours = this.today.getHours();                       //per calcolare il turno
  minuts = this.today.getMinutes();
  todayDay = this.today.toISOString().split('T')[0];   //visualizza la data di oggi
  turno: string;

  objMezzo: NewVehicle;
  objMezzi: NewVehicle[] = [];
  opzioniMezzi: OptionList[] = [];
  opzioniTurni: OptionList[] = [];
  opzioniSocc: OptionList[] = [];
  homeResult: HomeForm = new HomeForm();
  checklistID: string;

  isAutisti: boolean = false;
  isSoccorritori: boolean = false;

  @ViewChild('txtAutista') autista: FieldTextComponent;
  @ViewChild('txtSoccorritore1') soccorritore1: FieldTextComponent;
  @ViewChild('txtSoccorritore2') soccorritore2: FieldTextComponent;
  @ViewChild('txtSoccorritore3') soccorritore3: FieldTextComponent;

  constructor(
    private apiVehicle: ApiVehicleService,
    public homeService: HomeService,
    public modalSearchService: WDModalSearchService
  ) { }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
   if(event){
     this.buttonClass = "position-relative";
   }
  }

  ngOnInit() {
    this.homeService.resultHomeForm = [];
  	this.homeService.avanti = false;
    this.buttonClass = "fixed-bottom";
    this.objMezzi = this.setVehicles();
    this.opzioniTurni = this.homeService.shiftOptions;
    //data e turno di default
    this.homeResult.Data = this.todayDay;
    this.sceltaTurno();
  }

  Confronto() {
    //oggetto mezzo
    this.homeService.vehicleObj = this.objMezzo;
    this.checklistID = this.homeService.vehicleObj.Code;
    this.homeService.numeroSocc = this.objMezzo.VolunteerNr;
    this.homeService.avantiDisabile = true;
  }

  sceltaTurno() {
    if (this.hours >= 4 && this.hours < 11) {
      this.homeResult.Turno = "Mattina";
    } else if (this.hours >= 11 && this.hours < 17) {
      this.homeResult.Turno = "Pomeriggio";
    } else {
      this.homeResult.Turno = "Notte";
    }
  }

  setVehicles() {
    let vehiclesObj: NewVehicle[] = [];
    this.apiVehicle.onFetchRequestVehicles()
      .subscribe(vehicles => {
        vehicles.forEach(vehicle => {
          vehiclesObj.push(vehicle);
        });
        this.opzioniMezzi = this.setOptionsVehicles(vehiclesObj);
      },
        error => { console.log(error.status) }
      );
    return vehiclesObj;
  }

  setOptionsVehicles(list: NewVehicle[]) {
    let opzioni: OptionList[] = [];
    list.forEach(mezzo => {
      opzioni.push({
        label: mezzo.VehicleCode + ' - ' + this.homeService.getVehicleType(mezzo.VehicleTypesCode),
        value: mezzo.VehicleCode
      })
    });
    return opzioni;
  }

  findVehicleObj(targa: string) {
    this.objMezzi.find(mezzo => {
      if (mezzo.VehicleCode === targa) {
        this.objMezzo = mezzo;
      }
    });
  }

  prependZero(num: number): string | number {
    if (num <= 9)
      return "0" + num;
    else
      return num;
  }

  newValueAutista(e: NewRescuer) {
    this.homeResult.Autista = e.Code;
    return this.autista.value = e.Surname + ' ' + e.Name;
  }
  newValueSoccorritore1(e: NewRescuer) {
    this.homeResult.Soccorritore1 = e.Code;
    return this.soccorritore1.value = e.Surname + ' ' + e.Name;
  }
  newValueSoccorritore2(e: NewRescuer) {
    this.homeResult.Soccorritore2 = e.Code;
    return this.soccorritore2.value = e.Surname + ' ' + e.Name;
  }
  newValueSoccorritore3(e: NewRescuer) {
    this.homeResult.Soccorritore3 = e.Code;
    return this.soccorritore3.value = e.Surname + ' ' + e.Name;
  }

  onsubmit() {
	  this.homeService.avanti = true;
    //dati della data di oggi
    this.homeResult.Data = this.homeResult.Data + 'T' +
      this.prependZero(this.hours) + ':' +
      this.prependZero(this.minuts) + ':00Z';
    //dati della targa
    this.homeResult.Automezzo = this.objMezzo.Code;
    //manda dati
    this.homeService.resultHomeForm.push(this.homeResult);
  }

  getSearchExtraParameters() {
    var ep: SearchFieldDTO[] = [];
    var a1 = new SearchFieldDTO();
    var s1 = new SearchFieldDTO();
    var s2 = new SearchFieldDTO();
    var s3 = new SearchFieldDTO();
    var userRoles = new SearchFieldDTO();
   
    if(this.isAutisti){
      userRoles = {
        title: "Autista",
        name: "role",
        visible: false,
        type: "text",
        value: "Autista"
      }
      ep.push(userRoles);
    } else if(this.isSoccorritori){
      userRoles = {
        title: "Autista",
        name: "role",
        visible: false,
        type: "text",
        value: "Soccorritore"
      }
      ep.push(userRoles);
    }

    if (this.homeResult.Autista !== undefined) {
      a1 = {
        title: "Autista",
        name: "a1",
        visible: false,
        type: "text",
        value: String(this.homeResult.Autista)
      }
      ep.push(a1);
    }
    if (this.homeResult.Soccorritore1 !== undefined) {
      s1 = {
        title: "Soccorritore 1",
        name: "s1",
        visible: false,
        type: "text",
        value: String(this.homeResult.Soccorritore1)
      }
      ep.push(s1);
    }
    if (this.homeResult.Soccorritore2 !== undefined) {
      s2 = {
        title: "Soccorritore 2",
        name: "s2",
        visible: false,
        type: "text",
        value: String(this.homeResult.Soccorritore2)
      }
      ep.push(s2);
    }
    if (this.homeResult.Soccorritore3 !== undefined) {
      s3 = {
        title: "Soccorritore 3",
        name: "s3",
        visible: false,
        type: "text",
        value: String(this.homeResult.Soccorritore3)
      }
      ep.push(s3);
    }
    return ep;
  }
}
