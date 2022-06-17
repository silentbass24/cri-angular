import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule      } from '@angular/platform-browser';
import { AppRoutingModule   } from './app-routing.module';
import { AppComponent       } from './app.component';
import { NgbModule          } from '@ng-bootstrap/ng-bootstrap';
import { HeaderCRIComponent } from './header-cri/header-cri.component';
import { MainComponent      } from './main/main.component';
import { HomeComponent      } from './home/home.component';
import { FieldCheckCriComponent          } from './fields-cri/field-check-cri/field-check-cri.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavTabComponent                 } from './nav-tab/nav-tab.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BackOfficeModuleModule } from './back-office-module/back-office-module.module';
import { FormControlComponent  } from './form-control/form-control.component';
import { ResultComponent       } from './result/result.component';
import { ServiceWorkerModule   } from '@angular/service-worker';
import { environment           } from '../environments/environment';
import { WDFormFieldsModule    } from './modules/ngcomponents/formfields/wd.formfields.module';
import { WDFormModule          } from './modules/ngcomponents/form/wd.form.module';
import { WDAppComponentsModule } from './modules/ngcomponents/appcomponents/wd.appcomponents.module';
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { KeycloakService_Initializer } from './modules/ngcomponents/auth/auth.keycloak.init';
import { AuthService     } from './modules/ngcomponents/auth/auth.service';
import { FieldsCriModule } from './fields-cri/fields-cri.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WDSearchModule    } from './modules/ngcomponents/search/wd.search.module';
import { VehiclePipe       } from './pipe/vehicle.pipe';
import { UserPipe          } from './pipe/user.pipe';
import { CategoryPipe      } from './pipe/category.pipe';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [			
    AppComponent,
    HeaderCRIComponent,
    MainComponent,
    HomeComponent,
    FieldCheckCriComponent,
    NavTabComponent,
    FormControlComponent,
    ResultComponent,
    VehiclePipe,
    UserPipe,
    CategoryPipe,
    UnauthorizedComponent
   ],
  imports: [
    WDSearchModule,
    BrowserModule,
    AppRoutingModule,
    WDAppComponentsModule,
    WDFormFieldsModule,
    WDFormModule,    
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackOfficeModuleModule,
    FieldsCriModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FontAwesomeModule,
  ],
  providers: [
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: KeycloakService_Initializer,
      multi: true,
      deps: [KeycloakService]
    }, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
