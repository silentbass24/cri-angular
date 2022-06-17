import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT       } from '@angular/common';
import { Router         } from '@angular/router';
import { AuthService    } from '../modules/ngcomponents/auth/auth.service';
import { HomeService    } from '../services/home.service';

@Component({
  selector: 'app-header-cri',
  templateUrl: './header-cri.component.html',
  styleUrls: ['./header-cri.component.css']
})
export class HeaderCRIComponent implements OnInit {
  UserName: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  elem: any;

  constructor(public router: Router,
    private authService: AuthService,
    private homeService: HomeService,
    @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
    this.isAdmin = this.isAdminCri();
    this.isSuperAdmin = this.isSuperAdminCri();
    this.UserName = this.authService.getUsername();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  openProfilePage() {
    this.authService.redirectToProfile();
  }

  logout() {
    this.authService.logout(); 
  }

  isAdminCri() {
    for (let i = 0; i < this.authService.getRoles().length; i++) {
      if (this.authService.getRoles()[i] === "admin-cri") {
        return true;
      }
    }
    return false;
  }

  isSuperAdminCri(){
    for (let i = 0; i < this.authService.getRoles().length; i++) {
      if (this.authService.getRoles()[i] === "super-admin-cri") {
        return true;
      }
    }
    return false;
  }

  emptyHomeForm() {
    if(this.isAdmin){
      this.router.navigateByUrl('/admin/dashboard')
    } else if(this.isSuperAdmin) {
      this.router.navigateByUrl('/super-admin/committees');
    } else {
      this.homeService.avanti = false;
      this.homeService.avantiDisabile = false;
      this.homeService.numeroSocc = 0;
      this.homeService.resultHomeForm = [];
      this.router.navigateByUrl('/#').then(data => {this.router.navigateByUrl('/')});
    }
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      if (
        this.document.fullscreenElement ||
        this.document.webkitFullscreenElement ||
        this.document.mozFullScreenElement ||
        this.document.msExitFullscreenElement
      ) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
