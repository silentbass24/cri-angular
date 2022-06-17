import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCheckButtonComponent } from './field-check-button.component';

describe('FieldCheckButtonComponent', () => {
  let component: FieldCheckButtonComponent;
  let fixture: ComponentFixture<FieldCheckButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCheckButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCheckButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
