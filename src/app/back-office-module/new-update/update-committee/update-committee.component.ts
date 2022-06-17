import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCommitteeService    } from '../../service-admin/api-committee.service';
import { NewCommittee           } from 'src/app/main/model/newCommittee';

@Component({
  selector: 'app-update-committee',
  templateUrl: './update-committee.component.html',
  styleUrls: ['./update-committee.component.css']
})
export class UpdateCommitteeComponent implements OnInit {
  errorText: string = "";
  selectedFile: any;

  timeValue1: string;
  timeValue2: string;
  timeValue3: string;
  timeValue4: string;
  timeValue5: string;
  timeValue6: string;

  committeeID: string | null;
  committeeData = new NewCommittee();

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private apiCommittee: ApiCommitteeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.committeeID = this.route.snapshot.paramMap.get('committee_code');
    if (this.committeeID === null) {
      this.committeeData = new NewCommittee();
    } else {
      this.apiCommittee.updeteCommittee(this.committeeID).toPromise().then(comitato => {
        this.committeeData = comitato as NewCommittee;
      });
    }
  }

  getCommitteeUpdate() {
    this.apiCommittee.postUpdateCommittee(this.committeeData, this.committeeData.Code);
    this.router.navigateByUrl('/admin/committees');
  }

  getFormResult() {
    if (this.committeeData.CommitteeName !== undefined && this.committeeData.City !== undefined) {
      this.apiCommittee.onPostRequestCommittee(this.committeeData)
                       .subscribe(responseData => {
                           this.router.navigateByUrl('/admin/user/new-user?committee=' + responseData['committee_code']);
                        });
    } else {
      this.router.navigateByUrl('/admin/committee/new-committee');
      this.errorText = "Campo obbligatorio"
    }
  }

  newUser(){
    this.router.navigateByUrl('/admin/user/new-user?committee=' + this.committeeID);
  }

 /* onFileChange(file: any) {
    this.selectedFile = file.target.files[0];
    const reader = new FileReader();
    let byteArray;
    reader.addEventListener("loadend", () => {
      byteArray = this.convertDataURIToBinary(reader.result);
      this.committeeData.Logo = byteArray;
    }, false);
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
    reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
  }
  convertDataURIToBinary(dataURI: any) {
    var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }*/
}
