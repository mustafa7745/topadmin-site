import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsGroupsComponent } from './apps-groups.component';

describe('AppsGroupsComponent', () => {
  let component: AppsGroupsComponent;
  let fixture: ComponentFixture<AppsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppsGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
