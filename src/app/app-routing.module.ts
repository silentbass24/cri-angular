import { NgModule             } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent        } from './home/home.component';
import { ResultComponent      } from './result/result.component';
import { AuthGuard            } from './modules/ngcomponents/auth/auth.guard';
import { UpdateUserComponent  } from './back-office-module/new-update/update-user/update-user.component';
import { AdminComponent       } from './back-office-module/admin/admin.component';
import { UpdateVehicleComponent      } from './back-office-module/new-update/update-vehicle/update-vehicle.component';
import { UpdateCommitteeComponent    } from './back-office-module/new-update/update-committee/update-committee.component';
import { UpdateItemComponent         } from './back-office-module/new-update/update-item/update-item.component';
import { NewChecklistComponent       } from './back-office-module/new-update/new-checklist/new-checklist.component';
import { NewChecklistCategoriesComponent } from './back-office-module/new-update/new-checklist-categories/new-checklist-categories.component';
import { UpdateReportItemComponent       } from './back-office-module/new-update/update-report-item/update-report-item.component';
import { UnauthorizedComponent           } from './unauthorized/unauthorized.component';
import { AdminDashboardComponent         } from './back-office-module/admin-dashboard/admin-dashboard.component';
import { UpdateCategoryComponent } from './back-office-module/new-update/update-category/update-category.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ["user-cri"] }
  },
  {
    path: "super-admin",
    canActivate: [AuthGuard],
    data: { roles: ['super-admin-cri'] },
    children: [
      {
        path: "committees",
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['super-admin-cri'] },
      },
      {
        path: "committee/new-committee",
        component: UpdateCommitteeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['super-admin-cri'] },
      },
      {
        path: "committee/update-committee/:committee_code",
        component: UpdateCommitteeComponent,
        canActivate: [AuthGuard],
        data: { roles: ['super-admin-cri'] },
      },
    ]
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    data: { roles: ["admin-cri", 'super-admin-cri'] },
    children: [
      {
        path: "dashboard",
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ":table",
        component: AdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "user/new-user",
        component: UpdateUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "user/update-user/:users_code",
        component: UpdateUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "vehicle/new-vehicle",
        component: UpdateVehicleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "vehicle/update-vehicle/:unique_code",
        component: UpdateVehicleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "item/new-item",
        component: UpdateItemComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "item/update-item/:item_code",
        component: UpdateItemComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "category/new-category",
        component: UpdateCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "category/update-category/:item_code",
        component: UpdateCategoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "checklist/new-checklist",
        component: NewChecklistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "checklist/new-version-checklist/:checklist_code",
        component: NewChecklistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "report_details/:item_code",
        component: UpdateReportItemComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "checklist/categories/:checklistTemplate_code",
        component: NewChecklistCategoriesComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: "result",
    component: ResultComponent,
    canActivate: [AuthGuard],
    data: { roles: ["user-cri"] }
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
