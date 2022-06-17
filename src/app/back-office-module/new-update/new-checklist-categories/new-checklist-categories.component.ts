import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router       } from '@angular/router';
import { CategoryItemJson    } from 'src/app/main/model/categoryItem';
import { CheckListNode       } from 'src/app/main/model/checklist_node';
import { NewRescuer          } from 'src/app/main/model/newRescuer';
import { AuthService } from 'src/app/modules/ngcomponents/auth/auth.service';
import { SearchFieldDTO      } from 'src/app/modules/ngcomponents/search/models/searchfield-definition-DTO';
import { environment } from 'src/environments/environment';
import { ApiChecklistService } from '../../service-admin/api-checklist.service';
import { ApiItemService      } from '../../service-admin/api-item.service';
import { ApiUserService      } from '../../service-admin/api-user.service';

@Component({
  selector: 'app-new-checklist-categories',
  templateUrl: './new-checklist-categories.component.html',
  styleUrls: ['./new-checklist-categories.component.css']
})
export class NewChecklistCategoriesComponent implements OnInit {
  checklistDB: CategoryItemJson[] = [];
  checklistDB1 = new CategoryItemJson();

  checklistData: CheckListNode[] = [];
  checklistID: string;

  count = 0;
  countSub = 0;
  idCategoria: string;

  catSelected: string;

  categoryData1 = new CheckListNode();

  @ViewChild('txtCategoria1') txtcategoria1: any;
  @ViewChild('txtCategoria2') txtcategoria2: any;
  @ViewChild('txtItem1') txtitem1: any;
  @ViewChild('txtItem2') txtitem2: any;
  @ViewChild('txtContactID1') txtcontactID1: any;

  objCategories: CheckListNode[] = [];
  objCategory: CheckListNode;

  objUsers: NewRescuer[] = [];
  userDate: string = '';

  vehicleCode: string;

  isDraft: boolean = false;
  headerToken: string;

  constructor(private apiItem: ApiItemService,
    private apiUser: ApiUserService,
    private route: ActivatedRoute,
    private token: AuthService,
    private router: Router,
    private apiChecklist: ApiChecklistService) { }

  ngOnInit(): void {
    this.checklistData = [];
    this.token.getToken().then(data => this.headerToken = data);

    this.userDate = '';
    this.objCategories = this.setCategories();
    this.objUsers = this.setUsers();

    //this.objChecklistTemplates = this.setChecklistTemplates();
    var idCheckList = this.route.snapshot.paramMap.get('checklistTemplate_code');
    if(idCheckList!==null){
      this.checklistID = idCheckList;
      var bozza = this.route.snapshot.queryParams.draft;
      if(bozza!==null && bozza !== undefined){
        this.isDraft = bozza;
        this.apiChecklist.getChecklistJSONBozza(this.checklistID).toPromise().then((jsondati)=>{
          if(jsondati){
            this.checklistData = jsondati;
            this.count = this.checklistData.reduce((acc, cat) => acc = acc > cat.OrderID ? acc : cat.OrderID, 0);
          }
        })
      }
      if(this.checklistData.length === 0 && bozza === undefined || bozza === null){
        //acquisiamo la checklist tramite il servizio
        this.apiChecklist.getChecklist(this.checklistID)
        .toPromise()
        .then((jsondati) => {
            if(jsondati){
              this.checklistData = jsondati;
              this.count = this.checklistData.reduce((acc, cat) => acc = acc > cat.OrderID ? acc : cat.OrderID, 0);
            }
            /*for (let cat of this.checklistData) { cat.Value = true;
              if (cat.IsDropDown) {
                for (let sub of cat.Childs) { sub.Value = true; }
              }
            }*/
        })
        .catch(err => {
          console.log(err)
        });
      }
    }
  }

  setCategories() {
    let objCategoria: CheckListNode[] = [];
    this.apiItem.onFetchRequestItems()
      .subscribe(categories => {
        categories.forEach((category) => {
          objCategoria.push(category);
        });
      },
        error => { console.log(error.status) }
      );
    return objCategoria;
  }

  findCategoryObj(nome: string) {
    this.objCategories.find(categoria => {
      if (categoria.Name === nome) {
        this.objCategory = categoria;
      }
    });
    return this.objCategory.Code;
  }

  setUsers() {
    let objUtenti: NewRescuer[] = [];
    this.apiUser.onFetchRequestUsers()
      .subscribe(users => {
        users.forEach((user) => {
          objUtenti.push(user);
        });
      },
        error => { console.log(error.status) }
      );
    return objUtenti;
  }

  findUser(code: string) {
    this.userDate = '';
    this.objUsers.find(utente => {
      if (utente.Code === code) {
        this.userDate = '(' + utente.Surname + ' ' + utente.Name + ')';
      }
    });
    return this.userDate;
  }

  newValueCategory1(e: CheckListNode) {
    if(this.checklistData.length===0){
       this.count = 1;
    } else {
      this.count = this.count + 1;
    }
    this.categoryData1.Code = this.findCategoryObj(e.Name);
    this.categoryData1.NameComplete = e.NameComplete;
    this.categoryData1.Name = e.Name;
    this.txtcategoria1.value = e.Name;
    this.idCategoria = e.Code;
    e.IsDropDown = false;
    e.OrderID = this.count;
    e.Childs = [];
    this.checklistData.push(e);
    this.txtcategoria1.value = '';
    this.categoryData1 = new CheckListNode();
  }
  newValueCategory2(e: CheckListNode, category: CheckListNode) {
    if(category.Childs.length === 0){
      this.countSub = 1;
    } else {
      this.countSub = category.Childs[category.Childs.length-1].OrderSubID + 1;
    }
    this.categoryData1.Code = this.findCategoryObj(e.Name);
    this.categoryData1.NameComplete = e.NameComplete;
    this.categoryData1.Name = e.Name;
    this.txtcategoria2.value = e.Name;
    this.idCategoria = e.Code;
    e.OrderSubID = this.countSub;
    e.IsDropDown = false;
    e.Childs = [];
    category.IsDropDown = true;
    category.Childs.push(e);
    this.txtcategoria2.value = '';
    this.categoryData1 = new CheckListNode();
  }

  deleteCategory(name: string, order: number) {
    this.count = this.count -1;
    for (let item of this.checklistData) {
      if (item.Name === name) {
        let indice = this.checklistData.indexOf(item);
        this.checklistData.splice(indice, 1);
      }
    }
    for (let item of this.checklistData) {
      if(item.OrderID > order) {
        item.OrderID -= 1;
      }
    }
    if(this.checklistData.length === 0){
      this.checklistData = [];
    }
  }

  deleteSubCategory(cat: CheckListNode, subcat: CheckListNode) {
    this.countSub -= 1;
    for (let it of cat.Childs) {
      if (it.Name === subcat.Name) {
        let indice = cat.Childs.indexOf(it);
        cat.Childs.splice(indice, 1);
      }
      if (Object.keys(cat.Childs).length === 0) {
        cat.IsDropDown = false;
      }
    }
    for (let it of cat.Childs) {
      if(it.OrderSubID &&  subcat.OrderSubID)
      if(it.OrderSubID > subcat.OrderSubID) {
        it.OrderSubID -= 1;
      }
    }
  }
  newValueItem1(e: CheckListNode, category: CheckListNode) {
    category.Value = true;
    category.Childs.push(e);
    this.txtitem1.ID = this.findCategoryObj(e.NameComplete);
    this.txtitem1.NameComplete = e.NameComplete;
    this.txtitem1.Name = e.Name;
    this.txtitem1.value = e.Name;
    this.txtitem1.value = '';
  }

  newValueItem2(e: CheckListNode, category: CheckListNode) {
    category.Note = "true";
    category.Value = true;
    category.Childs.push(e);
    this.txtitem2.ID = this.findCategoryObj(e.NameComplete);
    this.txtitem2.NameComplete = e.NameComplete;
    this.txtitem2.Name = e.Name;
    this.txtitem2.value = e.Name;
    this.txtitem2.value = '';
  }

  deleteItem(name: string, subcat: CheckListNode) {
    for (let item of subcat.Childs) {
      if (item.Name === name) {
        let indice = subcat.Childs.indexOf(item);
        subcat.Childs.splice(indice, 1);
      }
    }
    if (Object.keys(subcat.Childs).length === 0) {
      subcat.Note = '';
    }
  }

  newValueUserID1(u: NewRescuer, item: CheckListNode) {
    for (let category of this.checklistData) {
      if (category.IsDropDown) {
        for (let sub of category.Childs) {
          for (let obj of sub.Childs) {
            if (obj === item) {
              obj.ContactCode = u.Code
            }
          }
        }
      } else {
        for (let obj of category.Childs) {
          if (obj === item) {
            obj.ContactCode = u.Code
          }
        }
      }
    }
    this.txtcontactID1 = u.Name + ' ' + u.Surname;
    this.txtcontactID1 = '';
  }

  //salva bozza
  getFormCategories() {
    this.checklistDB = [];
    var newChecklist = this.createJson(this.checklistData);
    this.apiChecklist.onPostRequestChecklistTemplateDetail(newChecklist)
      .subscribe(responseData => {
      });
    this.router.navigateByUrl('/admin/checklists');
  }

  //salva definitivo
  getFormCategoriesDef(){
    var newChecklist = this.createJson(this.checklistData);
    this.apiChecklist.onPostRequestChecklistTemplateDetailDefinitive(newChecklist, this.checklistID)
      .subscribe(responseData => {
      });
    this.router.navigateByUrl('/admin/checklists');
  }

  createJson(checklistDATI: CheckListNode[]){
   /* for (let category of checklistDATI) {
      //aggiungo ordinamento
      if (!category.IsDropDown) {
        this.count = this.count + 1;
        if(category.OrderID !== undefined && category.OrderID !== null ){
          category.OrderID = this.count;
        }
      } else {
        if(category.OrderID !== undefined && category.OrderID !== null ){
          category.OrderID = this.count + 1;
        }
        this.countSub = 0;
        category.Childs.forEach(child => {
          this.countSub = this.countSub + 1;
          this.count = this.count + 1;
          child.IsDropDown = false;
          child.OrderID = this.count;
          child.OrderSubID = this.countSub;
        })
      }
    }*/
    for (let category of checklistDATI) {
      if (!category.IsDropDown) {
        for (let item of category.Childs) {
          if (category.Code !== undefined && category.Code) {
            this.checklistDB1.ParentItemCode = category.Code;
            this.checklistDB1.ItemCode = item.Code;
          } else {
            this.checklistDB1.ParentItemCode = category.ItemCode;
            this.checklistDB1.ItemCode = item.ItemCode;
          }
          this.checklistDB1.ContactCode = item.ContactCode;
          this.checklistDB1.ChecklistCode = this.checklistID;
          this.checklistDB1.IsDropDown = category.IsDropDown;
          this.checklistDB1.OrderID = category.OrderID;
          this.checklistDB.push(this.checklistDB1);
          this.checklistDB1 = new CategoryItemJson();
        }
      } else {
        for (let subcat of category.Childs) {
          if (category.Code !== undefined && category.Code) {
            this.checklistDB1.ParentItemCode = category.Code;
            this.checklistDB1.ItemCode = subcat.Code;
          } else {
            this.checklistDB1.ParentItemCode = category.ItemCode;
            this.checklistDB1.ItemCode = subcat.ItemCode;
          }
          this.checklistDB1.OrderSubID = subcat.OrderSubID;
          this.checklistDB1.ChecklistCode = this.checklistID;
          this.checklistDB1.IsDropDown = category.IsDropDown;
          this.checklistDB1.OrderID = category.OrderID;
          this.checklistDB.push(this.checklistDB1);
          this.checklistDB1 = new CategoryItemJson();
          for (let it of subcat.Childs) {
            if (category.Code !== undefined && category.Code) {
              this.checklistDB1.ParentItemCode = subcat.Code;
              this.checklistDB1.ItemCode = it.Code;
            } else {
              this.checklistDB1.ParentItemCode = subcat.ItemCode;
              this.checklistDB1.ItemCode = it.ItemCode;
            }
            this.checklistDB1.ContactCode = it.ContactCode;
            this.checklistDB1.ChecklistCode = this.checklistID;
            this.checklistDB1.IsDropDown = false;
            this.checklistDB1.OrderID = subcat.OrderID;
            this.checklistDB.push(this.checklistDB1);
            this.checklistDB1 = new CategoryItemJson();
          }
        }
      }
    }
    return this.checklistDB;
  }

  closeCategory(categoria: CheckListNode) {
    if (categoria.Value === false) {
      categoria.Value = true;
      this.catSelected = categoria.Name;
    } else {
      categoria.Value = false;
      this.catSelected = '';
    }
  }

  getSearchExtraParametersCategory() {
    var ep: SearchFieldDTO[] = [];
    var a1 = new SearchFieldDTO();
    a1 = {
      title: "Categorie",
      name: "search",
      visible: false,
      type: "text",
      value: "category"
    }
    ep.push(a1);
    return ep;
  }
  getSearchExtraParametersItems() {
    var ep: SearchFieldDTO[] = [];
    var a1 = new SearchFieldDTO();
    a1 = {
      title: "Item",
      name: "search",
      visible: false,
      type: "text",
      value: "item"
    }
    ep.push(a1);
    return ep;
  }

  addContactCode() {
    var ep: SearchFieldDTO[] = [];
    var a1 = new SearchFieldDTO();
    a1 = {
      title: "Contatti",
      name: "role",
      visible: false,
      type: "text",
      value: "Riferimento"
    }
    ep.push(a1);
    return ep;
  }

  deleteDraft(){
    if (confirm("Conferma eliminazione")) {
      $.ajax({
        url: environment.paramUrlBase + '/api/admin/deleteChecklistTemplate/' + this.checklistID,
        type: "post",
        data: function (response: any) {
          response
        },
        headers: {
          Authorization: "Bearer " + this.headerToken
        },
        success: function (response) { // if post is successful
          window.location.href = environment.paramUrlBase + "/admin/checklists"
        },
        error: function (response) {
        }
      });
    }
    return false;
  }
}