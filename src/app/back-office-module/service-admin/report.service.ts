import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router     } from '@angular/router';
import { ItemHistory } from 'src/app/main/model/itemHistory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient, private router: Router) { }

   //get dati dell'item
   getItemDetail(check: string | null) {
    return this.http.get<any>(`${environment.paramUrlBase}/api/admin/getItemDetailsHistory?itemFaultID=${check}&start=0&length=10`);
  }

   //post dati per aggiornare utente
   postUpdateItemDetail(postUpdate: ItemHistory, id: string) {
    let data = JSON.stringify(postUpdate);
    this.http.post(`${environment.paramUrlBase}/api/admin/updateRepairStatus?id=${id}`, data)
    .subscribe(responseData => {
        window.location.reload();
    });
  }
}
