import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTextCriComponent } from './field-text-cri.component';

describe('FieldTextCriComponent', () => {
  let component: FieldTextCriComponent;
  let fixture: ComponentFixture<FieldTextCriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTextCriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTextCriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
