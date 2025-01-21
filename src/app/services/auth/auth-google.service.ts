import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);
  profile = signal<any>(null);
  private token = signal<any>(null);

  constructor() {
    this.initConfiguration();
  }
  
  initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    console.log(this.oAuthService.getGrantedScopes());
    
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidIdToken()) {
        this.profile.set(this.oAuthService.getIdentityClaims());
        this.token.set(this.oAuthService.getAccessToken());
        localStorage.setItem("accessToken", this.oAuthService.getAccessToken());
      }
    });
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.profile.set(null);
  }
  
  getProfile() {
    return this.profile();
  }
  
  getAccessToken() {
   return localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;
  }
}
