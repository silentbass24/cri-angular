import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTextCriNoComponent } from './field-text-no-cri.component';

describe('FieldTextCriNoComponent', () => {
  let component: FieldTextCriNoComponent;
  let fixture: ComponentFixture<FieldTextCriNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldTextCriNoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTextCriNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
