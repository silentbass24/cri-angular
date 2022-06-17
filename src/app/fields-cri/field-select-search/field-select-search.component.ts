import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldBasicComponent } from 'src/app/modules/ngcomponents/formfields/field-basic-component.widget';

@Component({
  selector: 'field-select-search',
  templateUrl: './field-select-search.component.html',
  styleUrls: ['./field-select-search.component.css']
})
export class FieldSelectSearchComponent extends FieldBasicComponent {

  @Input() selected: any;
  @Input() readonly: boolean = false;
  @Input() options: {label: string, value: any}[] = [];
  @Input() value: string = "";

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { super(); this.selected=this.value;}
    
  onValueChanged(selection: string) {
    this.valueChange.emit(selection);
  }  
}
