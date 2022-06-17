import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckListNode } from '../main/model/checklist_node';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css'],
})

export class NavTabComponent implements OnInit {
  @Input() selectedItem: number = 0;
  @Input() menuTab: CheckListNode[] = [];
  @Output() changeTab = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  tabChange(name: string) {
    this.changeTab.emit(name);
  }

  getClass(i: number | null, completion: CheckListNode) {
    if (this.selectedItem === i && i !== null) {
      return "active";
    }
    else if (!completion.IsDropDown) {
      if (completion.Value === 'half') {
        return 'half';
      }
      else if (completion.Value === 'full') {
        return 'full';
      }
      else {
        return "empty";
      }
    }
    else if (completion.IsDropDown) {
      completion.Value = completion.Childs.every(
        child => (child.Value === 'full' && child.Value !== null && child.Value !== "")) ? 'full'
        : completion.Childs.some(
          child => ((child.Value === 'half' || child.Value === 'full') && child.Value !== null && child.Value !== "")) ? 'half'
          : 'empty';
      return completion.Value;
    }
    else {
      return "";
    }
  }
}