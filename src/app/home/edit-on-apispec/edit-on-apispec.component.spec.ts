import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOnApispecComponent } from './edit-on-apispec.component';

describe('EditOnApispecComponent', () => {
  let component: EditOnApispecComponent;
  let fixture: ComponentFixture<EditOnApispecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOnApispecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOnApispecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
