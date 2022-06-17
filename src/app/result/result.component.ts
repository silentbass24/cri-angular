import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router         } from '@angular/router';
import { ApiItemService } from '../back-office-module/service-admin/api-item.service';
import { ApiUserService } from '../back-office-module/service-admin/api-user.service';
import { ApiVehicleService } from '../back-office-module/service-admin/api-vehicle.service';
import { CheckListNode } from '../main/model/checklist_node';
import { NewRescuer    } from '../main/model/newRescuer';
import { NewVehicle    } from '../main/model/newVehicle';
import { HomeService   } from '../services/home.service';
import { MedCarService } from '../services/med-car.service';
import { Subject       } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  //tabella
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild("datatableResult") datatable1: ElementRef;
  //tabella

  objCategories: CheckListNode[] = [];
  objUsers: NewRescuer[] = [];
  objVehicles: NewVehicle[] = [];

  buttonClass: string;

  message: string[];

  visualizza: boolean = false;
  count = 0;

  everyTRUE = false;

  constructor(
    public medCarService: MedCarService,
    public homeService: HomeService,
    public activeModal: NgbActiveModal,
    private router: Router,
    private modalService: NgbModal,
    private apiUser: ApiUserService,
    private apiVehicle: ApiVehicleService,
    private apiItem: ApiItemService) { }

  ngOnInit() {
    this.objCategories = this.setCategories();
    this.objUsers = this.setUsers();
    this.objVehicles = this.setVehicles();
    this.message = [];
    this.buttonClass = "fixed-bottom";
    this.everyTRUE = this.medCarService.resultForm.every(item=>item.Value===true);
    console.log("this.everyTrue",this.everyTRUE)

    //tabella
    this.dtOptions = {
      dom: "<'top'<'float-left m-2'l><'float-right m-2 paginazione'i>>tr<'bottom'<'row justify-content-md-center m-2 paginazione'p>>",
      ordering: false,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Italian.json"
      },
      responsive: true,
      processing: true,
      scrollX: true,
      scrollCollapse: true,
      serverSide: true,
      searching: false,
      //pagingType: "full_numbers",
      //pageLength: 10,
      //paging: true,
      lengthChange: true,
      //lengthMenu: [5, 10, 25],
      info: true,
    };
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (event) {
      this.buttonClass = "position-relative";
    }
  }

  getClass(value: any) {
    if (value === false) {
      this.count += 1;
      return "sfondo-rosso";
    } else {
      return "sfondo-verde"
    }
  }

  soloNO() {
    this.visualizza = false;
  }
  getAllResult() {
    this.visualizza = true;
  }

  setCategories() {
    this.apiItem.onFetchRequestItems()
      .subscribe(categories => {
        this.objCategories = categories;
      },
        error => { console.log(error.status) }
      );
    return this.objCategories;
  }

  setUsers() {
    this.apiUser.onFetchRequestUsers()
      .subscribe(users => {
        this.objUsers = users;
      },
        error => { console.log(error.status) }
      );
    return this.objUsers;
  }

  setVehicles() {
    this.apiVehicle.onFetchRequestVehicles()
      .subscribe(veicoli => {
        this.objVehicles = veicoli;
      },
        error => { console.log(error.status) }
      );
    return this.objVehicles;
  }

  backHomePage(popup: any) {
    if (this.count !== 0) {
      for (let item of this.medCarService.resultForm) {
        if (item.Value === false && item.ContactCode) {
          let userContact = this.objUsers.find(utente => utente.Code === item.ContactCode);
          if (userContact !== undefined) {
            let messaggio = `<span class='text-center'>
              Per favore contatta il <strong>${userContact.Surname} ${userContact.Name}</strong> al 
              <strong>${userContact.PhoneNumber}</strong> 
              e spiega il guasto.
              </span><br>`
            if (!this.message.some(msg => msg === messaggio)) {
              this.message.push(messaggio);
            }
          }
        }
      }
      if(this.message.length!==0){
        this.open(popup);
      }else {
        this.router.navigateByUrl('/')
                   .then(data=>{window.location.reload()});
      }
    } else {
      this.router.navigateByUrl('/')
                 .then(data=>{window.location.reload()});
    }
  }

  open(popup: any) {
    this.modalService.open(popup, { size: 'l' });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('/')
               .then(data=>{window.location.reload()});
  }
}