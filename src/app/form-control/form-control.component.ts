import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeService   } from '../services/home.service';
import { CheckList     } from './../main/model/checklist';
import { CheckListNode } from '../main/model/checklist_node';
import { Router        } from '@angular/router';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.css']
})
export class FormControlComponent implements OnInit {
  @Input() node: CheckListNode = new CheckListNode();
  @Input() parentNode: CheckListNode = new CheckListNode();
  @Input() fullCheckList: CheckList;
  @Input() activeTab: number;

  @Input() menuTab: CheckListNode[] = [];
  @Output() changeTab2 = new EventEmitter<string>();
  btnDisabled = false;

  optionCarburante: any;

  constructor(
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit() {
    if (this.homeService.resultHomeForm.length === 0) {
      this.router.navigateByUrl('/');
    }
    this.optionCarburante = this.homeService.optionsCarburante;
  }

  onNext() {
    this.btnDisabled = false;
    let lastElement = this.menuTab[this.menuTab.length - 1];
    let lastElementOrderID: number;
    
    if (!lastElement.IsDropDown) {
      lastElementOrderID = lastElement.OrderID;
    } else {
      let arrayOrder = [];
      for (let i = 0; i < lastElement.Childs.length; i++) {
        arrayOrder.push(lastElement.Childs[i].OrderID);
      }
      lastElementOrderID = Math.max.apply(null, arrayOrder);
    }
    if (this.activeTab < lastElementOrderID) {
      this.activeTab = this.activeTab + 1;
    }
    let result = '';
    for (let i = 0; i < this.menuTab.length; i++) {
      if (this.activeTab === this.menuTab[i].OrderID && !this.menuTab[i].IsDropDown) {
        result = this.menuTab[i].Name;
        break;
      }
      else {
        if (this.menuTab[i].IsDropDown) {
          let campi2 = this.menuTab[i].Childs;
          for (let ii = 0; ii < campi2.length; ii++) {
            if (campi2[ii].OrderID === this.activeTab && !campi2[ii].IsDropDown) {
              result = campi2[ii].Name;
              break;
            } else {
              let campi3 = campi2[ii].Childs;
              for (let jj = 0; jj < campi3.length; jj++) {
                if (campi2[ii].OrderID === this.activeTab) {
                  result = campi3[jj].Name;
                  break;
                }
              }
            }
          }
        }
      }
    }
    this.changeTab2.emit(result);
  }

  onBack() {
    let result = '';
    if (this.activeTab !== undefined && this.activeTab !== 1) {
      this.activeTab = this.activeTab - 1;
    }
    for (let i = 0; i < this.menuTab.length; i++) {
      if (this.activeTab === this.menuTab[i].OrderID && !this.menuTab[i].IsDropDown) {
        if (this.menuTab[i].OrderID >= 1) {
          result = this.menuTab[i].Name;
          this.btnDisabled = false;
          break;
        } else {
          this.btnDisabled = true;
          break;
        }
      }
      else {
        if (this.menuTab[i].IsDropDown) {
          let campi2 = this.menuTab[i].Childs;
          for (let ii = 0; ii < campi2.length; ii++) {
            if (campi2[ii].OrderID === this.activeTab && !campi2[ii].IsDropDown) {
              result = campi2[ii].Name;
              break;
            } else {
              let campi3 = campi2[ii].Childs;
              for (let jj = 0; jj < campi3.length; jj++) {
                if (campi2[ii].OrderID === this.activeTab) {
                  result = campi3[jj].Name;
                  break;
                }
              }
            }
          }
        }
      }
    }
    this.changeTab2.emit(result);
  }
}