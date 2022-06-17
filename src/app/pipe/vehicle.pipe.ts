import { Pipe, PipeTransform } from '@angular/core';
import { NewVehicle          } from '../main/model/newVehicle';

@Pipe({
  name: 'convertValueVehicles'
})
export class VehiclePipe implements PipeTransform {

  transform(value?: string, args?: Array<NewVehicle>): string {
    return this.convertValueVehicles(value, args);
  }

  convertValueVehicles(num?: string, objVehicles?: Array<NewVehicle>): string {
    let variabile = '';
    if (objVehicles !== undefined) {
      objVehicles.find(veicolo => {
        if (veicolo.Code === num) {
          variabile = veicolo.VehicleCode;
        } 
      });
    }
    return variabile;
  }
}
