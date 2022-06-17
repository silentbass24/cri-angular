import { Injectable, OnInit } from '@angular/core';
import { HttpClient    } from '@angular/common/http';
import { CheckListNode } from 'src/app/main/model/checklist_node';
import { NewChecklist  } from 'src/app/main/model/newChecklist';
import { AuthService   } from 'src/app/modules/ngcomponents/auth/auth.service';
import { environment   } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiChecklistService implements OnInit{

  newChecklist = new NewChecklist();
  headerToken: string;

  ngOnInit(): void { 
    this.token.getToken().then(data => this.headerToken = data);
  }

  constructor(private http: HttpClient, private token: AuthService) { }

  //getJsonStructByCheckCode
  getChecklist(idLIST: string) {
      return this.http.get<any>(`${environment.paramUrlBase}/api/admin/showStandardTemplate/${idLIST}`, {headers: {
        Authorization: "Bearer " + this.headerToken
      }
    });
  }
  //getStructByCheckCode
  getChecklistData(idLIST: string) {
      return this.http.get<any>(`${environment.paramUrlBase}/api/admin/showChecklistTemplate/${idLIST}`, {headers: {
        Authorization: "Bearer " + this.headerToken
      }
    });
  }

  //get checklist a seconda dell'id del veicolo
  getChecklistJSON(idLIST?: string) {
    return this.http.get<CheckListNode[]>(`${environment.paramUrlBase}/api/template/search/details/${idLIST}`, {headers: {
        Authorization: "Bearer " + this.headerToken
      }
    });
  }
  //get checklist a seconda dell'id del veicolo
  getChecklistJSONBozza(idLIST?: string) {
    return this.http.get<CheckListNode[]>(`${environment.paramUrlBase}/api/admin/getJsonStructByCheckCode/${idLIST}`, {headers: {
        Authorization: "Bearer " + this.headerToken
       }
    });
  }
  //inserimento dati nuova checklist
  onPostRequestChecklistTemplate(postData: any) {
    let data = JSON.stringify(postData);
     return this.http.post(`${environment.paramUrlBase}/api/admin/newTemplate`, data)
  }

   //inserimento dati nuova checklist categorie
   onPostRequestChecklistTemplateDetail(postData: any) {
    let data = JSON.stringify(postData);
     return this.http.post(`${environment.paramUrlBase}/api/admin/newTemplateDetail`, data)
  }

   //inserimento dati nuova checklist categorie definitiva
   onPostRequestChecklistTemplateDetailDefinitive(postData: any, idLIST: string) {
    let data = JSON.stringify(postData);
     return this.http.post(`${environment.paramUrlBase}/api/admin/issueChecklistTemplate?checklistTemplate_code=${idLIST}`, data)
  }
}