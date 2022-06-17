import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldTextCriNoComponent } from './field-text-no-cri/field-text-no-cri.component';
import { FieldSelectCriComponent } from './field-select-cri/field-select-cri.component';
import { FieldTextCriComponent } from './field-text-cri/field-text-cri.component';
import { FieldSelectSearchComponent } from './field-select-search/field-select-search.component';
import { FieldHoursCriComponent } from './field-hours-cri/field-hours-cri.component';
import { FieldCheckButtonComponent } from './field-check-button/field-check-button.component';

@NgModule({
  declarations: [
    FieldTextCriNoComponent,
    FieldSelectCriComponent,
    FieldTextCriComponent,
    FieldSelectSearchComponent,
    FieldHoursCriComponent,
    FieldCheckButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    FieldTextCriNoComponent,
    FieldSelectCriComponent,
    FieldTextCriComponent,
    FieldSelectSearchComponent,
    FieldHoursCriComponent,
    FieldCheckButtonComponent
  ]
})
export class FieldsCriModule { }
