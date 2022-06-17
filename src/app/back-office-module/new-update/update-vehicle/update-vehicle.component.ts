import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewVehicle        } from 'src/app/main/model/newVehicle';
import { NewVehicleType    } from 'src/app/main/model/newVehicleType';
import { OptionList        } from 'src/app/main/model/options';
import { APIService        } from 'src/app/services/API.service';
import { ApiVehicleService } from '../../service-admin/api-vehicle.service';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  errorText: string = "";
  vehicleID: string = "";
  vehicleData = new NewVehicle();

  optionsVehicleType: OptionList[] = [];
  optionVehicleType: { label: string, value: string } = { label: '', value: '' };
  objVehicleTypes: NewVehicleType[] = [];
  objVehicleType: NewVehicleType;

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private apiVehicleType: APIService,
    private apiVehicle: ApiVehicleService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.objVehicleTypes = this.setVehicleTypes();
    var vehicleid = this.route.snapshot.paramMap.get('unique_code');
    if (vehicleid !== null) {
      this.vehicleID = vehicleid;
    }
    if (this.vehicleID === '') {
      this.vehicleData = new NewVehicle();
    } else {
      this.apiVehicle.updeteVehicle(this.vehicleID).toPromise().then(vehicle => {
        this.vehicleData = vehicle as NewVehicle;
        this.optionVehicleType = this.convertValueVehicleType(this.vehicleData.VehicleTypesCode);
      });
    }
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
        value: vehicleType.VehicleType
      });
    });
    return opzioniTipiVeicoli;
  }

  findVehicleTypeObj(tipo: string) {
    this.objVehicleTypes.find(tipoveicolo => {
      if (tipoveicolo.VehicleType === tipo) {
        this.objVehicleType = tipoveicolo;
      }
    });
    this.vehicleData.VehicleTypesCode = this.objVehicleType.Code;
  }

  convertValueVehicleType(num: string) {
    this.objVehicleTypes.find(tipoveicolo => {
      if (tipoveicolo.Code === num) {
        this.optionVehicleType = { label: tipoveicolo.VehicleType, value: tipoveicolo.VehicleType };
      }
    });
    return this.optionVehicleType;
  }

  getVehicleUpdate() {
    this.apiVehicle.postUpdateVehicle(this.vehicleData, this.vehicleData.Code);
    this.router.navigateByUrl('/admin/vehicles');
  }

  getFormResult() {
    if (this.vehicleData.VehicleCode !== undefined && this.vehicleData.VehicleTypesCode !== undefined) {
      this.vehicleData.VehicleTypesCode = this.objVehicleType.Code;
      this.apiVehicle.onPostRequestVehicle(this.vehicleData);
      this.router.navigateByUrl('/admin/vehicles');
    } else {
      this.router.navigateByUrl('/admin/vehicle/new-vehicle');
      this.errorText = "Campo obbligatorio";
    }
  }
}