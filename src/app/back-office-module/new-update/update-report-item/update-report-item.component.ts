import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ItemHistory } from 'src/app/main/model/itemHistory';
import { ReportService } from '../../service-admin/report.service';

@Component({
  selector: 'app-update-report-item',
  templateUrl: './update-report-item.component.html',
  styleUrls: ['./update-report-item.component.css']
})
export class UpdateReportItemComponent implements OnInit {
  @Input() itemData: ItemHistory[]=[];
  @Input() lastItem: ItemHistory;
  @Input() riparato: boolean;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(private apiReport: ReportService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   
  }
  getItemUpdate(){
    this.lastItem.Repaired = this.riparato;
    this.apiReport.postUpdateItemDetail(this.lastItem, this.lastItem.Code);
  }
}