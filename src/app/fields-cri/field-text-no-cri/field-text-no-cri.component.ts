import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckList     } from 'src/app/main/model/checklist';
import { CheckListNode } from 'src/app/main/model/checklist_node';
import { MedCarService } from 'src/app/services/med-car.service';

@Component({
  selector: 'app-field-text-no-cri',
  templateUrl: './field-text-no-cri.component.html',
  styleUrls: ['./field-text-no-cri.component.css']
})
export class FieldTextCriNoComponent implements OnInit {
  placeholder: string;
  @Input() value: any;
  @Input() note: string;
  @Output() valueChange = new EventEmitter<any>();
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
    this.placeholder = "Note";
    if (this.note===undefined){
      this.note="";
    }
  }

  valueChanged(e:any ){
    this.valueChange.emit(e.target.value);
    //this.medCarService.checkListValues2(this.node, this.fullCheckList);
    this.medCarService.checkListValues(this.node, this.fullCheckList);
  }

  noteChanged(e: any){
    this.note = e.target.value;
    this.valueChangeText.emit(e.target.value);
  }
}
