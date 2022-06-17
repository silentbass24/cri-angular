import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-field-check-button',
  templateUrl: './field-check-button.component.html',
  styleUrls: ['./field-check-button.component.css']
})
export class FieldCheckButtonComponent implements OnInit {

    /**holds current value of input */
    @Input() value: boolean = false;
    @Input() errorText?: string;
  
    /**invoked when model has been changed
     */
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
    @Input() title: string = "";
    @Input() disabled: boolean = false;
    @Input() nameCheck: string = "";
  
    constructor() { }
  
    ngOnInit(): void {
    }

    changeValue(){
      this.value=!this.value; 
      this.valueChange.emit(this.value);
    }
}
