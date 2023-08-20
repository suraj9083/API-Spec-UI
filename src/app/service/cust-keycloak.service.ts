import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class CustKeycloakService {

  private keycloak: any;

  constructor(private keycloakService : KeycloakService) {
    
  }

  public initKeycloak() {
    const Keycloak = require('keycloak-js');
    
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'test',
      clientId: 'angular'
    });

    this.keycloak.init({ onLoad: 'login-required' }).then((authenticated: any) => {
      if (authenticated) {
        this.loadProfile();
      }
    });
  }

  public loadProfile(){ 
    let user_profile =  this.keycloakService.loadUserProfile();
    return user_profile;
  }

  public isAuthenticated(): boolean {
    return this.keycloak.authenticated;
  }

}
