import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSelectSearchComponent } from './field-select-search.component';

describe('FieldSelectSearchComponent', () => {
  let component: FieldSelectSearchComponent;
  let fixture: ComponentFixture<FieldSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldSelectSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
