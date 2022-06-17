import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field-hours-cri',
  templateUrl: './field-hours-cri.component.html',
  styleUrls: ['./field-hours-cri.component.css']
})
export class FieldHoursCriComponent implements OnInit {
  @Input() title: string = "";
  @Input() disabled: boolean = false;
  @Input() value: any;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() notValid: boolean = false;
  errorText: string = "";
  @Input() cols: number = 3;  
  @HostBinding('class') get className(){
    return "col-md-" + this.cols;
  }
  setError ( errMsg: string ) {
    this.errorText=errMsg;
    this.notValid=true;
  }
  @Output() valueChange = new EventEmitter<any>();
  
  constructor() {}

  ngOnInit(): void {
  }

  valueChanged(ora: any ){
    this.valueChange.emit(ora);
  }

}
