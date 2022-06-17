import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiItemService     } from '../../service-admin/api-item.service';
import { NewItem            } from 'src/app/main/model/newItem';
import { OptionList         } from 'src/app/main/model/options';
import { APIService         } from 'src/app/services/API.service';
import { AlertLevel         } from 'src/app/main/model/alertLevel';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {
  errorText: string = "";
  
  itemID: string | null;
  itemData = new NewItem();
  opzioniTipi: OptionList[] = [];

  optionsAlertLevels: OptionList[] = [];
  optionAlertLevel: { label: string, value: string } = { label: '', value: '' };
  objAlertLevels: AlertLevel[] = [];
  objAlertLevel: AlertLevel;

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private apiItem:    ApiItemService,
    private apiService: APIService,
    private route:      ActivatedRoute,
    private router:     Router) { }

  ngOnInit() {
    this.objAlertLevels = this.setAlertLevels();
    this.itemID = this.route.snapshot.paramMap.get('item_code');
    if (this.itemID === null) {
      this.itemData = new NewItem();
    } else {
      this.apiItem.updeteItem(this.itemID).toPromise().then(item => {
        this.itemData = item as NewItem;
        this.optionAlertLevel = this.convertValueAlertLevel(this.itemData.AlertLevelCode);
      });
    }
    this.opzioniTipi = [
                          {label: "Check", value: "radio"},
                          {label: "Select", value: "select"},
                          {label: "Testo", value: "text"},
                          {label: "Numero", value: "number"}
                       ];
  }

  setAlertLevels() {
    let objLivelli: AlertLevel[] = [];
    this.apiService.onFetchRequestAlertLevels()
      .subscribe(levels => {
        levels.forEach((level) => {
          objLivelli.push(level);
        });
        this.optionsAlertLevels = this.setOptionsAlertLevels(objLivelli);
      },
        error => { console.log(error.status) }
      );
    return objLivelli;
  }

   setOptionsAlertLevels(list: AlertLevel[]) {
    let opzioniLivelli: OptionList[] = [];
    list.forEach(livello => {
      opzioniLivelli.push({
        label: livello.Name,
        value: livello.Name
      });
    });
    return opzioniLivelli;
  }

  findAlertLevelObj(livello: string) {
    this.objAlertLevels.find(level => {
      if (level.Name === livello) {
        this.objAlertLevel = level;
      }
    });
    this.itemData.AlertLevelCode = this.objAlertLevel.Code;
  }

  convertValueAlertLevel(num: string) {
    this.objAlertLevels.find(level => {
      if (level.Code === num) {
        this.optionAlertLevel = { label: level.Name, value: level.Name };
      }
    });
    return this.optionAlertLevel;
  }
  
  getItemUpdate() {
    this.apiItem.postUpdateItem(this.itemData, this.itemData.Code);
    this.router.navigateByUrl('/admin/items');
  }

  getFormResult() {
    if (this.itemData.Name !== undefined) {
        this.itemData.Name = this.itemData.Name.toUpperCase();
      this.apiItem.onPostRequestItem(this.itemData);
      this.router.navigateByUrl('/admin/items');
    } else {
      this.router.navigateByUrl('/admin/item/new-item');
      this.errorText = "Campo obbligatorio"
    }
  }
}
