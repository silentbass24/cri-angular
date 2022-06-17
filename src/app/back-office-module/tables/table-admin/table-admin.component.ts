import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router   } from '@angular/router';
import { ItemHistory    } from 'src/app/main/model/itemHistory';
import { AuthService    } from 'src/app/modules/ngcomponents/auth/auth.service';
import { SearchFieldDTO } from 'src/app/modules/ngcomponents/search/models/searchfield-definition-DTO';
import { environment    } from 'src/environments/environment';
import { ReportService  } from '../../service-admin/report.service';

@Component({
  selector: 'app-table-admin',
  templateUrl: './table-admin.component.html',
  styleUrls: ['./table-admin.component.css']
})
export class TableAdminComponent implements OnInit {
  @Input() searchName: string;
  extra_parameters: SearchFieldDTO[];
  extra_code: any;
  extra_code_detail: any;
  extra_code_detail_check: any;
  updateStr: string;
  deleteStr: string;
  headerToken: string;
  thisURL: string;
  aggiungiNuovo: string;


  itemData: ItemHistory[] = [];
  lastItem: ItemHistory;
  riparato: boolean;

  constructor(private apiReport: ReportService,
    private router: Router,
    private token: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.extra_parameters = [];
    this.thisURL = this.router.url;
    this.aggiungiNuovo = "AGGIUNGI NUOVO";
    if (this.thisURL === "/admin/checklists") {
      this.aggiungiNuovo = "AGGIUNGI NUOVA";
    } else if (this.thisURL === "/admin/items") {
      this.aggiungiNuovo = "AGGIUNGI ITEM";
    }
    this.token.getToken().then(data => this.headerToken = data);
    this.extra_code = this.route.snapshot.queryParams.check_list_code;
    this.extra_code_detail = this.route.snapshot.queryParams.code;

    this.itemData = [];

    if (typeof this.extra_code !== 'undefined') {
      var a1 = new SearchFieldDTO();
      a1 = {
        title: "Ricerca per id",
        name: "check_list_code",
        visible: false,
        type: "text",
        value: this.extra_code
      }
      this.extra_parameters.push(a1);
    }
    if (typeof this.extra_code_detail !== 'undefined') {
      this.apiReport.getItemDetail(this.extra_code_detail)
        .toPromise().then((items: any) => {
          let maxDate = items.data[0].CreatedAt;
          for (let date of items.data) {
            if (date.CreatedAt >= maxDate) {
              maxDate = date.CreatedAt;
              this.lastItem = date;
              if(this.lastItem.Repaired === "NO" || this.lastItem.Repaired === false){
                this.riparato = false;
              } else {
                this.riparato = true;
              }  
            }
          }
          this.itemData = items;
        });
      var a1 = new SearchFieldDTO();
      a1 = {
        title: "Item code",
        name: "itemFaultID",
        visible: false,
        type: "text",
        value: this.extra_code_detail
      }
      this.extra_parameters.push(a1);
    }
    if (this.searchName === 'report') {
      var a3 = new SearchFieldDTO();
      a3 = {
        title: "Valore fault",
        name: "fault",
        visible: false,
        type: "text",
        value: "false"
      }
      this.extra_parameters.push(a3);
    }
    if (this.searchName === 'items') {
      var a4 = new SearchFieldDTO();
      a4 = {
        title: "Item",
        name: "search",
        visible: false,
        type: "text",
        value: "all"
      }
      this.extra_parameters.push(a4);
    }
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      // do your task for before route
      return false;
    }
  }

  onUpdateData(data: any) {
    this.getTypeOfObj(data);
    if (this.searchName === 'report') {
      this.router.navigateByUrl('/admin/check_report_details?check_list_code=' + this.updateStr)
        .then(() => {
          window.location.reload();
          //this.router.navigateByUrl('/admin/check_report_details?check_list_code=' + this.updateStr);
        });
    } else if (this.searchName === 'check_report_details') {
      this.router.navigateByUrl('/admin/report_details?code=' + this.updateStr);
    } else if (this.searchName === 'committees') {
      this.router.navigateByUrl('/super-admin/' + this.updateStr);
    } else if (this.searchName === 'checklists' && data.DraftStatusBool) {
      console.log("bozza")
    } else {
      this.router.navigateByUrl('/admin/' + this.updateStr);
    }
  }

  onDeleteData(data: any) {
    this.getTypeOfObj(data);
    if (confirm("Conferma eliminazione")) {
      $.ajax({
        url: environment.paramUrlBase + '/api/admin/' + this.deleteStr,
        type: "post",
        data: function (response: any) {
          response
        },
        headers: {
          Authorization: "Bearer " + this.headerToken
        },
        success: function (response) { // if post is successful
          console.log("success", response);
        },
        error: function (response) {
          console.log('error', response)
        }
      });
    }
    return false;
  }

  getTypeOfObj(data: any) {
    if (data.Surname && data.Name) {
      this.updateStr = "user/update-user/" + data.Code;
      this.deleteStr = "deleteUser/" + data.Code;
    } else if (data.Volunteers) {
      this.updateStr = "vehicle/update-vehicle/" + data.Code;
      this.deleteStr = "deleteVehicle/" + data.Code;
    } else if (data.CommitteeName && data.City) {
      this.updateStr = "committee/update-committee/" + data.Code;
      this.deleteStr = "super/deleteCommittee/" + data.Code;
    } else if (data.Name && !data.Surname && !data.Version && !data.Category && data.AlertLevelCode) {
      this.updateStr = "item/update-item/" + data.Code;
      this.deleteStr = "deleteItem/" + data.Code;
    } else if (data.Name && !data.Surname && !data.Version && !data.Category && data.AlertLevelCode === null) {
      this.updateStr = "category/update-category/" + data.Code;
      this.deleteStr = "deleteItem/" + data.Code;
    } else if (data.Version > 0 && data.DraftStatus === "NO") {
      this.updateStr = "checklist/new-version-checklist/" + data.Code;
      this.deleteStr = "deleteChecklistTemplate/" + data.Code;
    } else if (data.Version === 0 && data.DraftStatus === "SI") { //bozza     
      this.updateStr = "checklist/categories/" + data.Code +"?draft=true"; 
      this.deleteStr = "deleteChecklistTemplate/" + data.Code;
    } else if (data.Category && data.AlertLevel) {//dettagli item della checklist
      this.updateStr = data.ID;
    } else if (data.ChecklistCode) {              //dettagli checklist con tutti gli item
      this.updateStr = data.ChecklistCode;
    }
  }

  addNew() {
    if (this.thisURL === "/admin/vehicles") { //veicoli
      this.router.navigateByUrl('/admin/vehicle/new-vehicle')
    } else if (this.thisURL === "/admin/items") { //item
      this.router.navigateByUrl('/admin/item/new-item')
    } else if (this.thisURL === "/admin/checklists") { //checklist
      this.router.navigateByUrl('/admin/checklist/new-checklist')
    } else if (this.thisURL === "/super-admin/committees") { //comitato
      this.router.navigateByUrl('/super-admin/committee/new-committee')
    } else {
      this.router.navigateByUrl('/admin/user/new-user')
    }
  }
  addNewCategory() {
    this.router.navigateByUrl('/admin/category/new-category')
  }
}
