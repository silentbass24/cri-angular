import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewRescuer     } from 'src/app/main/model/newRescuer';
import { NewRole        } from 'src/app/main/model/newRole';
import { ApiUserService } from '../../service-admin/api-user.service';
import { APIService     } from 'src/app/services/API.service';
import { OptionList     } from 'src/app/main/model/options';
import { NewCommittee   } from 'src/app/main/model/newCommittee';
import { ApiCommitteeService } from '../../service-admin/api-committee.service';
import { AuthService         } from 'src/app/modules/ngcomponents/auth/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  errorText: string = '';
  userID: string = '';
  userData = new NewRescuer();

  userDataRole: { UsersCode: string, RolesCode: string }[] = [];
  userDataDelete: { UsersCode: string, RolesCode: string }[] = [];

  objRoles: NewRole[] = [];

  committeeCity: string = '' ;
  committeeID: string = '' ;
  optionsCommittee: OptionList[] = [];
  optionCommittee: { label: string, value: string } = { label: '', value: '' };
  objCommittees: NewCommittee[] = [];
  objCommittee: NewCommittee;

  msgAlert: string = "";
  isSuperAdmin: boolean;

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private apiUser: ApiUserService,
    private authService : AuthService,
    private apiService: APIService,
    private apiComitati: ApiCommitteeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    //codice del comitato
    var committeeid = this.route.snapshot.queryParams.committee;
    if (typeof committeeid !== "undefined"){
      this.committeeID =  committeeid;
    }
    //comitati e il comitato trovato con codice del query param
    this.objCommittees = this.setCommittees();

    this.userData.Roles = [];
    this.objRoles = this.setRoles();
    var userid = this.route.snapshot.paramMap.get('users_code');
    if (userid !== null && userid !== undefined) {
      this.userID = userid;
    }
    if (this.userID === '') {
      this.userData = new NewRescuer();
      this.userData.Roles = [];
      this.userData.CommitteeCode = this.committeeID;
    } else {
      this.apiUser.updeteUser(this.userID).toPromise().then(user => {
        this.committeeCity = this.findCommitteeByCode(user.CommitteeCode);
        this.optionCommittee = {label:  this.committeeCity, value:  this.committeeCity}
        this.userData = user as NewRescuer;
        for (let role of this.userData.Roles) {
          let ruolo = { UsersCode: this.userData.Code, RolesCode: role.Code };
          this.userDataRole.push(ruolo);
        }
      });
    }
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

  setCommittees() {
    let objCommittee: NewCommittee[] = [];
    this.apiComitati.onFetchRequestCommittee()
      .subscribe(committees => {
        committees.forEach(committee => {objCommittee.push(committee)});
        var comitato = objCommittee.find(comitato=>comitato.Code === this.committeeID);
        if(comitato!==undefined){
           this.committeeCity=comitato.City;
           this.optionCommittee={label: this.committeeCity, value: this.committeeCity}
        }
        this.optionsCommittee = this.setOptionsCommittees(objCommittee);
      },
        error => { console.log(error.status) }
      );
    return objCommittee;
  }

  setOptionsCommittees(list: NewCommittee[]) {
    let opzioniComitati: OptionList[] = [];
    list.forEach(committee => {
      opzioniComitati.push({
        label: committee.City,
        value: committee.City
      });
    });
    return opzioniComitati;
  }

  findCommitteeObj(citta: string) {
    this.objCommittees.find(comitato => {
      if (comitato.City === citta) {
        this.objCommittee = comitato;
      }
    });
    this.userData.CommitteeCode = this.objCommittee.Code;
  }
  findCommitteeByCode(id: string) {
    var comitato1 = this.objCommittees.find(comitato=>comitato.Code===id);
    if (comitato1 !== undefined) {
      return comitato1.City;
    } 
    return '';
  }

  convertValueCommittee(num: string) {
    for(let comitato of this.objCommittees){
      if(comitato.Code === num){
         this.optionCommittee = {label: comitato.City, value: comitato.City}
      } 
    }
  }

  setRoles() {
    let objRoles: NewRole[] = [];
    this.apiService.onFetchRequestRoles()
      .subscribe(roles => {
        roles.forEach((role) => {
          objRoles.push(role);
        });
      },
        error => { console.log(error.status) }
      );
    return objRoles;
  }

  valueRole(ruolo: string) {
    if (this.userData.Roles !== null && this.userData.Roles !== undefined) {
      for (let m = 0; m < this.userData.Roles.length; m++) {
        if (this.userData.Roles[m].Code === ruolo) {
          return true;
        }
      }
    }
    return false;
  }

  changedRole(event: boolean, role: NewRole) {
    if (event === true && this.userID !== null) {
      this.userData.Roles.push(role);
      this.userDataRole.push({ UsersCode: this.userID, RolesCode: role.Code });
    } else if (event === false) {
      this.deleteRole(role.Code);
      this.userDataDelete.push({ UsersCode: this.userID, RolesCode: role.Code });
    }
  }

  deleteRole(role: string) {
    for (let ruolo of this.userDataRole) {
      if (ruolo.RolesCode === role) {
        let indice = this.userDataRole.indexOf(ruolo);
        this.userDataRole.splice(indice, 1);
      }
    }
    for (let ruolo of this.userData.Roles) {
      if (ruolo.Code === role) {
        let indice = this.userData.Roles.indexOf(ruolo);
        this.userData.Roles.splice(indice, 1);
      }
    }
  }

  getUserUpdate() {
    this.userData.Roles = [];
    this.apiUser.postUpdateUser(this.userData, this.userData.Code);
    this.apiUser.postUpdateUserRole(this.userDataRole);
    this.apiUser.postDeleteUserRole(this.userDataDelete);
    this.router.navigateByUrl('/admin/users');
  }

  getFormResult() {
    if (this.userData.Name !== undefined && this.userData.Surname !== undefined && this.userData.Email !== undefined) {
      if(this.isSuperAdmin && this.userData.CommitteeCode === undefined){
        this.router.navigateByUrl('/admin/user/new-user');
        this.errorText = "Campo obbligatorio";
      } else {
        this.apiUser.onPostRequestUser(this.userData).subscribe(
          responseData => {
            this.router.navigateByUrl('/admin/users');
          },
          error => { 
            console.log(error.status);
            if(error.status === 400){
              this.router.navigateByUrl('/admin/user/new-user');
              this.msgAlert = "Utente già registrato";
            }
          }); 
      }
     
    } else {
      this.router.navigateByUrl('/admin/user/new-user');
      this.errorText = "Campo obbligatorio";
    }
  }
}
