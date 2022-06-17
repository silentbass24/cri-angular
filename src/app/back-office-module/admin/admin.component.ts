import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  value: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let param=this.route.snapshot.paramMap.get('table');
    //this.route.snapshot.url[0].path//routeConfig?.path
    if(param===null){
      this.value='committees'; 
    }else{
      this.value = param;
    }
  }
}
