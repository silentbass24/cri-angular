import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckList } from 'src/app/main/model/checklist';
import { CheckListNode } from 'src/app/main/model/checklist_node';
import { MedCarService } from 'src/app/services/med-car.service';

@Component({
  selector: 'app-field-select-cri',
  templateUrl: './field-select-cri.component.html',
  styleUrls: ['./field-select-cri.component.css']
})
export class FieldSelectCriComponent implements OnInit {
  selected: any;
  placeholder: string;
  @Input() options: {name: string, value: any}[] = [];
  @Input() required: boolean = false;

  @Input() value = "";
  @Input() note: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChangeText = new EventEmitter<any>();

  @Input() title: string = "";
  @Input() disabled: boolean = false;
  @Input() node: CheckListNode;
  @Input() parentNode: CheckListNode;
  @Input() fullCheckList: CheckList;

  constructor(
    private medCarService: MedCarService
  ) {}
  
  ngOnInit(): void {
    this.selected=this.value;
    this.placeholder = "Note";
    if (this.note===undefined){
      this.note="";
    }
  }

  onValueChanged(selection: string) {
    this.valueChange.emit(selection);
   // this.medCarService.checkListValues2(this.node, this.fullCheckList);
    this.medCarService.checkListValues(this.node, this.fullCheckList);
  }  

  noteChanged(e: any){
    this.note = e.target.value;
    this.valueChangeText.emit(e.target.value);
  }
}
