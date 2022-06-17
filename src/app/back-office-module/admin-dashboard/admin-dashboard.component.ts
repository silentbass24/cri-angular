import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/ngcomponents/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isSuperAdmin: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isSuperAdmin = this.isSuperAdminCri();
  }

  isSuperAdminCri(){
    for (let i = 0; i < this.authService.getRoles().length; i++) {
      if (this.authService.getRoles()[i] === "super-admin-cri") {
        return true;
      }
    }
    return false;
  }

}
