import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable()

export class AuthGuard extends KeycloakAuthGuard {
    constructor(
        protected override readonly router: Router,
        protected readonly keycloak: KeycloakService
    ) {
        super(router, keycloak);
    }

    public async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        console.log("first...", window.location.origin + state.url)
        // Force the user to log in if currently unauthenticated.
        if (!this.authenticated) {
            await this.keycloak.login({
                redirectUri: window.location.origin + state.url
            });
            let profile: any = this.keycloak.loadUserProfile();
            console.log("Profile..", profile)
            let userId = profile['__zone_symbol__value']['id'];
            localStorage.setItem('id', userId);
            console.log("second...", window.location.origin + state.url)
        }

        // Get the roles required from the route.
        const requiredRoles = route.data['roles'];

        // Allow the user to proceed if no additional roles are required to access the route.
        if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
            return true;
        }

        // Allow the user to proceed if all the required roles are present.
        return requiredRoles.every((role) => this.roles.includes(role));
    }

    public async loadProfile(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        let profile: any = this.keycloak.loadUserProfile();
        console.log("Profile..", profile)
        let userId = profile['__zone_symbol__value']['id'];
        localStorage.setItem('id', userId);
        if (localStorage.getItem('id')) {
            return
        }
    }

}