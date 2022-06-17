import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewItem } from 'src/app/main/model/newItem';
import { ApiItemService } from '../../service-admin/api-item.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  errorText: string = "";
  thisURL: string;
  
  itemID: string | null;
  itemData = new NewItem();

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private apiItem:    ApiItemService,
    private route:      ActivatedRoute,
    private router:     Router) { }

  ngOnInit() {
    this.thisURL = this.router.url;
    this.itemID = this.route.snapshot.paramMap.get('item_code');
    if (this.itemID === null) {
      this.itemData = new NewItem();
    } else {
      this.apiItem.updeteItem(this.itemID).toPromise().then(item => {
        this.itemData = item as NewItem;
      });
    }
  }
  
  getItemUpdate() {
    this.apiItem.postUpdateItem(this.itemData, this.itemData.Code);
    this.router.navigateByUrl('/admin/items');
  }

  getFormResult() {
    if (this.itemData.Name !== undefined) {
        this.itemData.Name = this.itemData.Name.toUpperCase();
      if(this.itemData.NameComplete !== undefined){
        this.itemData.NameComplete = this.itemData.NameComplete.toUpperCase();
      }
      this.apiItem.onPostRequestItem(this.itemData);
      this.router.navigateByUrl('/admin/items');
    } else {
      this.router.navigateByUrl('/admin/item/new-item');
      this.errorText = "Campo obbligatorio"
    }
  }
}
