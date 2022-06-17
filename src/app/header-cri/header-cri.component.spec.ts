import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCRIComponent } from './header-cri.component';

describe('HeaderCRIComponent', () => {
  let component: HeaderCRIComponent;
  let fixture: ComponentFixture<HeaderCRIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCRIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
