import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCheckCriComponent } from './field-check-cri.component';

describe('FieldCheckCriComponent', () => {
  let component: FieldCheckCriComponent;
  let fixture: ComponentFixture<FieldCheckCriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCheckCriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCheckCriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
