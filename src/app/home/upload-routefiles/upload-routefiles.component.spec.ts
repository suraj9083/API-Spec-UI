import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRoutefilesComponent } from './upload-routefiles.component';

describe('UploadRoutefilesComponent', () => {
  let component: UploadRoutefilesComponent;
  let fixture: ComponentFixture<UploadRoutefilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRoutefilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRoutefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
