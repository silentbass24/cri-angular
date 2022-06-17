import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChecklistCategoriesComponent } from './new-checklist-categories.component';

describe('NewChecklistCategoriesComponent', () => {
  let component: NewChecklistCategoriesComponent;
  let fixture: ComponentFixture<NewChecklistCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewChecklistCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChecklistCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
