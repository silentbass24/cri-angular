import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OptionList        } from 'src/app/main/model/options';
import { APIService        } from 'src/app/services/API.service';
import { NewItem           } from 'src/app/main/model/newItem';
import { NewVehicleType    } from 'src/app/main/model/newVehicleType';
import { ApiChecklistService } from '../../service-admin/api-checklist.service';
import { NewVehicle        } from 'src/app/main/model/newVehicle';
import { ApiVehicleService } from '../../service-admin/api-vehicle.service';
import { NewChecklist      } from 'src/app/main/model/newChecklist';

@Component({
  selector: 'app-new-checklist',
  templateUrl: './new-checklist.component.html',
  styleUrls: ['./new-checklist.component.css']
})
export class NewChecklistComponent implements OnInit {
  checklistData: NewItem[];
  errorText: string;
  newChecklistID: any;

  optionsVehicleType: OptionList[] = [];
  optionVehicleType: { label: string, value: string | number } = { label: '', value: '' };
  objVehicleTypes: NewVehicleType[] = [];
  objVehicleType: NewVehicleType;

  optionsVehicle: OptionList[] = [];
  optionVehicle: { label: string, value: string } = { label: '', value: '' };
  objVehicles: NewVehicle[] = [];
  objVehicle: NewVehicle;

  checklistID: string | null;

  constructor(
    private apiVehicleType: APIService,
    private apiVehicle: ApiVehicleService,
    private router: Router,
    private route:  ActivatedRoute,
    public apiChecklist: ApiChecklistService) { }

  ngOnInit(): void {
    this.checklistID = this.route.snapshot.paramMap.get('checklist_code');
    if (this.checklistID === null) {
      this.apiChecklist.newChecklist = new NewChecklist();
    } else {
      //visualizza dati per creare una nuova versione
      this.apiChecklist.getChecklistData(this.checklistID).toPromise()
        .then( item => {
          this.apiChecklist.newChecklist = item as NewChecklist; //item.data[0] as NewChecklist;  
          this.optionVehicle = {label: item.Targa, value: item.Targa};
          this.optionVehicleType = this.convertValueVehicleType(this.apiChecklist.newChecklist.VehicleType);
        });
    }
    this.objVehicleTypes = this.setVehicleTypes();
    this.objVehicles = this.setVehicles();
    this.checklistData = [];
  }

  setVehicles() {
    let objVehicle: NewVehicle[] = [];
    this.apiVehicle.onFetchRequestVehicles()
      .subscribe(vehicles => {
        vehicles.forEach((vehicle) => {
          objVehicle.push(vehicle);
        });
        this.optionsVehicle = this.setOptionsVehicle(objVehicle);
      },
        error => { console.log(error.status) }
      );
    return objVehicle;
  }

  setOptionsVehicle(list: NewVehicle[]) {
    let opzioniVeicoli: OptionList[] = [];
    list.forEach(vehicle => {
      opzioniVeicoli.push({
        label: vehicle.VehicleCode,
        value: vehicle.VehicleCode
      });
    });
    return opzioniVeicoli;
  }

  findVehicleObj(targa: any) {
    this.objVehicles.find(veicolo => {
      if (veicolo.VehicleCode === targa) {
        this.objVehicle = veicolo;
      }
    });
    this.apiChecklist.newChecklist.VehicleCode = this.objVehicle.Code;
    this.apiChecklist.newChecklist.VehicleType = this.objVehicle.VehicleTypesCode;
    for(let objtype of this.optionsVehicleType){
      if(this.objVehicle.VehicleTypesCode === objtype.value){
        this.optionVehicleType = objtype;
      }
    }
  }

  convertValueVehicle(num: string) {
    this.objVehicles.find(veicolo => {
      if (veicolo.Code === num) {
        this.optionVehicle = { label: veicolo.VehicleCode, value: veicolo.VehicleCode };
      }
    });
    return this.optionVehicle;
  }

  setVehicleTypes() {
    let objVehicleType: NewVehicleType[] = [];
    this.apiVehicleType.onFetchRequestVehicleTypes()
      .subscribe(vehicletypes => {
        vehicletypes.forEach((vehicletype) => {
          objVehicleType.push(vehicletype);
        });
        this.optionsVehicleType = this.setOptionsVehicleType(objVehicleType);
      },
        error => { console.log(error.status) }
      );
    return objVehicleType;
  }

  setOptionsVehicleType(list: NewVehicleType[]) {
    let opzioniTipiVeicoli: OptionList[] = [];
    list.forEach(vehicleType => {
      opzioniTipiVeicoli.push({
        label: vehicleType.VehicleType,
        value: vehicleType.Code
      });
    });
    return opzioniTipiVeicoli;
  }

  findVehicleTypeObj(citta: string) {
    this.objVehicleTypes.find(tipoveicolo => {
      if (tipoveicolo.VehicleType === citta) {
        this.objVehicleType = tipoveicolo;
      }
    });
    this.apiChecklist.newChecklist.VehicleType = this.objVehicleType.Code;
  }

  convertValueVehicleType(num: string) {
    this.objVehicleTypes.find(tipoveicolo => {
      if (tipoveicolo.Code === num) {
        this.optionVehicleType = { label: tipoveicolo.VehicleType, value: tipoveicolo.Code };
      }
    });
    return this.optionVehicleType;
  }

  navigate(id_cl: any) {
    this.router.navigate(['/admin/checklist/categories', id_cl])
      .then(() => {
        window.location.reload();
      });
  }

  navigateToUpdateJson(id_cl: any, id_old: string | null) {
    this.router.navigate(['/admin/checklist/categories/', id_cl, '?old_code=', id_old])
      .then(() => {
        window.location.reload();
      });
  }

  getFormResult() {
    //crea nuova bozza
    if(this.checklistID!==null && this.checklistID !== undefined){
      this.apiChecklist.onPostRequestChecklistTemplate(this.apiChecklist.newChecklist).subscribe(responseData => {
        this.newChecklistID = responseData;
        this.navigateToUpdateJson(this.newChecklistID, this.checklistID);
      });
    }
    if (this.apiChecklist.newChecklist.Name !== undefined && this.checklistID === null || this.checklistID === undefined) {
      this.apiChecklist.onPostRequestChecklistTemplate(this.apiChecklist.newChecklist).subscribe(responseData => {
        this.newChecklistID = responseData;
        this.navigate(this.newChecklistID);
      });
    } else {
      this.router.navigateByUrl('/admin/checklist/new-checklist');
      this.errorText = "Campo obbligatorio"
    }
  }
}