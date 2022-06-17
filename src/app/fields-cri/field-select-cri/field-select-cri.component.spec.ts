import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectCriComponent } from './field-select-cri.component';

describe('FieldSelectCriComponent', () => {
  let component: FieldSelectCriComponent;
  let fixture: ComponentFixture<FieldSelectCriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSelectCriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectCriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
