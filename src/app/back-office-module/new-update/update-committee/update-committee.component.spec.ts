import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommitteeComponent } from './update-committee.component';

describe('UpdateCommitteeComponent', () => {
  let component: UpdateCommitteeComponent;
  let fixture: ComponentFixture<UpdateCommitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCommitteeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
