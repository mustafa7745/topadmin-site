import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsGroupsComponent } from './permissions-groups.component';

describe('PermissionsGroupsComponent', () => {
  let component: PermissionsGroupsComponent;
  let fixture: ComponentFixture<PermissionsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionsGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermissionsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
