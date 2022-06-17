import { NgModule              } from '@angular/core';
import { CommonModule          } from '@angular/common';
import { AdminComponent        } from './admin/admin.component';
import { FormsModule           } from '@angular/forms';
import { WDFormFieldsModule    } from '../modules/ngcomponents/formfields/wd.formfields.module';
import { WDAppComponentsModule } from '../modules/ngcomponents/appcomponents/wd.appcomponents.module';
import { WDFormModule          } from '../modules/ngcomponents/form/wd.form.module';
import { FieldsCriModule       } from '../fields-cri/fields-cri.module';
import { NgxDatatableModule    } from '@swimlane/ngx-datatable';
import { DataTablesModule      } from 'angular-datatables';
import { BrowserModule         } from '@angular/platform-browser';
import { RouterModule          } from '@angular/router';
import { UpdateUserComponent   } from './new-update/update-user/update-user.component';
import { WDSearchModule        } from '../modules/ngcomponents/search/wd.search.module';
import { AppRoutingModule      } from '../app-routing.module';
import { TableAdminComponent   } from './tables/table-admin/table-admin.component';
import { UpdateVehicleComponent    } from './new-update/update-vehicle/update-vehicle.component';
import { UpdateCommitteeComponent  } from './new-update/update-committee/update-committee.component';
import { UpdateItemComponent       } from './new-update/update-item/update-item.component';
import { NewChecklistComponent     } from './new-update/new-checklist/new-checklist.component';
import { NewChecklistCategoriesComponent } from './new-update/new-checklist-categories/new-checklist-categories.component';
import { UpdateReportItemComponent       } from './new-update/update-report-item/update-report-item.component';
import { AdminDashboardComponent         } from './admin-dashboard/admin-dashboard.component';
import { UpdateCategoryComponent } from './new-update/update-category/update-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    TableAdminComponent,
    UpdateUserComponent,
    UpdateVehicleComponent,
    UpdateCommitteeComponent,
    UpdateItemComponent,
    NewChecklistComponent,
    NewChecklistCategoriesComponent,
    UpdateReportItemComponent,
    AdminDashboardComponent,
    UpdateCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    WDFormFieldsModule,
    WDAppComponentsModule,
    WDFormModule,
    FieldsCriModule,
    NgxDatatableModule,
    DataTablesModule,
    BrowserModule,
    RouterModule,
    WDSearchModule,
    AppRoutingModule
  ],
  exports:[
    TableAdminComponent,
    AdminComponent,
    NewChecklistCategoriesComponent,
    UpdateReportItemComponent,
    NgxDatatableModule,
    DataTablesModule,
    AdminDashboardComponent,
    UpdateCategoryComponent
  ]
})
export class BackOfficeModuleModule { }
