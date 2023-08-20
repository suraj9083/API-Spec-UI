import { TestBed } from '@angular/core/testing';

import { CustKeycloakService } from './cust-keycloak.service';

describe('CustKeycloakService', () => {
  let service: CustKeycloakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustKeycloakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
