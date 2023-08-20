import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

let keycloakIP = environment.keyIP;
export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        // config: {
        //   url: 'http://localhost:8080',
        //   realm: 'TempDyno',
        //   clientId: 'angular'
        // },
        config: {
          url: `http://${keycloakIP}:8080`,
          realm: 'master',
          clientId: 'angular'
        },
        initOptions: {
            checkLoginIframe: true,
            checkLoginIframeInterval: 25
        },
      });
  }
