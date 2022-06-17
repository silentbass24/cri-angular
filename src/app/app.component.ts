import { Component} from '@angular/core';
import { Router   } from '@angular/router';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portaleCRI';


  constructor( private router: Router,
               private homeService: HomeService){
      this.homeService.userAuthorization().subscribe(
        responseData => {
          if(responseData===false){
            this.router.navigateByUrl('/unauthorized');
          }
      },
        error =>  { console.log(error.status);
                    this.router.navigateByUrl('/unauthorized'); 
                  }
      );   
    } 
}
