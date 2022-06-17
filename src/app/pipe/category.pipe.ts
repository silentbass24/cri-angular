import { Pipe, PipeTransform } from '@angular/core';
import { CheckListNode       } from '../main/model/checklist_node';

@Pipe({
  name: 'convertValueCategory'
})
export class CategoryPipe implements PipeTransform {

  transform(value?: string, args?: Array<CheckListNode>): unknown {
    return this.convertValueCategory(value, args);
  }

  convertValueCategory(num?: string, objCategories?: Array<CheckListNode>) {
    let variabile = '';
    if (objCategories !== undefined) {
      objCategories.find(categoria => {
        if (categoria.Code === num) {
          if (categoria.NameComplete) {
            variabile = categoria.NameComplete;
          } else {
            variabile = categoria.Name;
          }
        }
      });
    }
    return variabile;
  }
}
