import { HttpClient    } from '@angular/common/http';
import { Injectable    } from '@angular/core';
import { CheckListNode } from 'src/app/main/model/checklist_node';
import { NewItem       } from 'src/app/main/model/newItem';
import { environment   } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiItemService {

  constructor(private http: HttpClient) { }

  //GET REQUEST categorie
  onFetchRequestItems() {
    return this.http.get<CheckListNode[]>(`${environment.paramUrlBase}/api/getItems`);
  }

  //inserimento dati nuovo item
  onPostRequestItem(postData: any) {
    let data = JSON.stringify(postData);
    this.http.post(`${environment.paramUrlBase}/api/admin/newItem`, data)
      .subscribe(responseData => {
      });
  }

  //get dati per aggiornare item
  updeteItem(idItem: string) {
    return this.http.get<NewItem>(`${environment.paramUrlBase}/api/admin/getItem/${idItem}`);
  }
  //post dati per aggiornare item
  postUpdateItem(postUpdate: any, id: string){
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/updateItem/${id}`, data)
      .subscribe(responseData => {
      });
  }
}
