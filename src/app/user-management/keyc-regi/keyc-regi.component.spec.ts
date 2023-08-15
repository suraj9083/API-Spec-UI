import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycRegiComponent } from './keyc-regi.component';

describe('KeycRegiComponent', () => {
  let component: KeycRegiComponent;
  let fixture: ComponentFixture<KeycRegiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeycRegiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeycRegiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
