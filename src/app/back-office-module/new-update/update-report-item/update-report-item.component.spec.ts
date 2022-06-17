import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReportItemComponent } from './update-report-item.component';

describe('UpdateReportItemComponent', () => {
  let component: UpdateReportItemComponent;
  let fixture: ComponentFixture<UpdateReportItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReportItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReportItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
