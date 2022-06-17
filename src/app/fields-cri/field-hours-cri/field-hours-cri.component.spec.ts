import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldHoursCriComponent } from './field-hours-cri.component';

describe('FieldHoursCriComponent', () => {
  let component: FieldHoursCriComponent;
  let fixture: ComponentFixture<FieldHoursCriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldHoursCriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldHoursCriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
