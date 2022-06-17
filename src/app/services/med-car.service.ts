import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { CheckList } from "../main/model/checklist";
import { CheckListNode } from "../main/model/checklist_node";
import { ResultForm } from "../main/model/resultForm";
import { ResultFormTotal } from "../main/model/resultFormTotal";
import { HomeService } from "./home.service";

//URL del server
//const addURL = 'http://localhost:3000/';
//const addURL = 'https://cri-medesan.wedare.it/json/';
//const addURL = 'http://192.168.1.204:3000/';

@Injectable({
  providedIn: "root",
})
export class MedCarService {
  valueChange = new EventEmitter<any>();
  valueChangeCheck = new EventEmitter<any>();
  resultForm: ResultForm[] = [];
  fault: boolean = false;
  resultFormTotal: ResultFormTotal;
  canSubmit = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router, private homeService: HomeService) { }

  /**Metodo per caricare gli oggetti elencati nel file JSON*/
  getCheckList(name: string): Observable<CheckList> {
    //ritorno dei dati del JSON, come parametro si passa l'URL del JSON costruito in modo da avere un URL generale
    return this.httpClient.get<CheckList>(
      environment.serverURL + "checklist_" + name + ".json"
    );
  }

  /**Metodo per ricaricare la pagina*/
  reloadPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
  }

  /**Metodo per colorare navtab*/
  checkListValues(node: CheckListNode, fullCheckList: CheckList) {
    node.Value = 'empty';
    node.Value = node.Childs.every(child => (child.Value !== null && child.Value !== "" && child.Value !== "half")) ? 'full'
      : node.Childs.some(child => (child.Value !== null && child.Value !== "")) ? 'half' : 'empty';
      
    let isFull = false;
    fullCheckList.Childs.forEach(categoria => {
      let subCatFull = categoria.Childs.every(child => {
        return child.Value !== null && child.Value !== '' && child.Value !== 'empty' && child.Value !== 'half';
      });
      if(categoria.IsDropDown && subCatFull){
        categoria.Value = 'full';
      } 
    });
    isFull = fullCheckList.Childs.every(child => {
      return child.Value !== null && child.Value !== '' && child.Value !== 'empty' && child.Value !== 'half';
    });
    this.canSubmit.next(isFull);
  }

  /* checkListValues2(fullCheckList: CheckList) {
    // node.value = "empty";
    let isFull = false;

    for (let parentNode of fullCheckList.childNodes) {
      if (!parentNode.isDropDownMenu) {
        isFull = parentNode.childNodes.every(child => {
          return child.value !== null && child.value !== '';
            // node.value = 'full';
        });
      } else if (parentNode.isDropDownMenu) {
        for (let child of parentNode.childNodes) {
          isFull = child.childNodes.every(subChild => subChild.value !== null && subChild.value !== '');
        }
      }
    }
    this.canSubmit.next(isFull);
  } */

  formCollect() {
    this.resultForm.forEach(el => {
      if (el.Value === false || el.Value === "vuoto" || el.Value === 0) {
        this.fault = true;
      }
    });
    this.resultFormTotal = { home: this.homeService.resultHomeForm, resForm: this.resultForm, fault: this.fault };
    //console.log("RESULT", this.resultFormTotal)
  }
}
