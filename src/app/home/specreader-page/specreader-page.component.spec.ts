import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecreaderPageComponent } from './specreader-page.component';

describe('SpecreaderPageComponent', () => {
  let component: SpecreaderPageComponent;
  let fixture: ComponentFixture<SpecreaderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecreaderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecreaderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
