import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckList     } from 'src/app/main/model/checklist';
import { CheckListNode } from 'src/app/main/model/checklist_node';
import { MedCarService } from 'src/app/services/med-car.service';

@Component({
  selector: 'app-field-check-cri',
  templateUrl: './field-check-cri.component.html',
  styleUrls: ['./field-check-cri.component.css']
})
export class FieldCheckCriComponent implements OnInit {
  placeholder: string;

  @Input() value?: boolean;
  @Input() note: string = '';
  @Output() valueChange = new EventEmitter<any>();
  @Output() valueChangeText = new EventEmitter<any>();
 
  @Input() title: string = "";
  @Input() disabled: boolean = false;
  @Input() node: CheckListNode;
  @Input() parentNode: CheckListNode;
  @Input() fullCheckList: CheckList;

  constructor(private medCarService: MedCarService){}

  ngOnInit(): void {
    this.placeholder = "Note";
    if (this.note===undefined){
      this.note="";
    }
  }
  
  valueChanged(newValue: any){
     this.valueChange.emit(newValue);
  }

  clickYES(){
      this.value=true;
      this.valueChanged(this.value);      
     // this.medCarService.checkListValues2(this.node, this.fullCheckList);
      this.medCarService.checkListValues(this.node, this.fullCheckList);
  }
  
  clickNO(){
      this.value=false;
      this.valueChanged(this.value);
      //  this.medCarService.checkListValues2(this.node, this.fullCheckList);
      this.medCarService.checkListValues(this.node, this.fullCheckList);
  }

  noteChanged(e: any){
    this.note = e.target.value;
    this.valueChangeText.emit(e.target.value);
  }
}