import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CustKeycloakService } from 'src/app/service/cust-keycloak.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: any = "User";
  keycloakIP = environment.keyIP;

  constructor(private keycloakService: KeycloakService, private keycloakAuthService: CustKeycloakService) { }

  ngOnInit(): void {
    this.keycloakAuthService.loadProfile().then(profile => {
      if (profile) {
        this.name = profile['firstName']?.toUpperCase();
      }
    })

  }

  async logoutAndRedirect() {
    const idTokenHint: any = this.keycloakService.getKeycloakInstance().idToken;

    // Perform token validation before logout
    const isValidToken = await this.validateToken(idTokenHint);

    if (isValidToken) {
      const postLogoutRedirectUri = 'http://localhost:4200' || 'https://api-spec-ui.vercel.app';

      // Manually perform the Keycloak logout with proper parameters
      const logoutUrl = `http://${this.keycloakIP}:8080/realms/master/protocol/openid-connect/logout?id_token_hint=${idTokenHint}&post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
      window.location.href = logoutUrl;
    } else {
      // Handle the case when the token is invalid or expired
      alert('Invalid token. Skipping logout.');
    }
  }

  async validateToken(token: string): Promise<boolean> {
    return token !== null && token !== undefined && token.trim() !== '';
  }

}
