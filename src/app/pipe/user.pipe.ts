import { Pipe, PipeTransform } from '@angular/core';
import { NewRescuer          } from '../main/model/newRescuer';

@Pipe({
  name: 'convertValueUsers'
})
export class UserPipe implements PipeTransform {

  transform(value: string, args?: Array<NewRescuer>): unknown {
    return this.convertValueUsers(value, args);
  }

  convertValueUsers(num?: string, objUsers?: Array<NewRescuer>) {
    let variabile = '';
    if (objUsers !== undefined) {
      objUsers.find(user => {
        if (user.Code === num) {
          variabile = user.Surname + ' ' + user.Name;
        } 
      });
    }
    return variabile;
  }
}
