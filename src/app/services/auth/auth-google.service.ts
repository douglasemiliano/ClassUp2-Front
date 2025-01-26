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
  idUser = signal<any>(null);
  private token = signal<any>(null);

  constructor() {
    this.initConfiguration();
  }
  
  initConfiguration() {

    if (typeof localStorage !== "undefined") {
      
      if(localStorage.getItem("profile")) {
        this.profile.set(JSON.parse(localStorage.getItem("profile")!))
      } else {
        this.oAuthService.configure(authConfig);
        this.oAuthService.setupAutomaticSilentRefresh();
        this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
          if (this.oAuthService.hasValidIdToken()) {
            this.profile.set(this.oAuthService.getIdentityClaims());
            this.token.set(this.oAuthService.getAccessToken());
            this.idUser.set(this.oAuthService.getIdentityClaims()['sub']);
            localStorage.setItem("accessToken", this.oAuthService.getAccessToken());
            localStorage.setItem("userId", this.oAuthService.getIdentityClaims()['sub'])
            localStorage.setItem("profile", JSON.stringify(this.oAuthService.getIdentityClaims()));
          }
        });

      }
      
   }
    
    

  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.profile.set(null);
    window.localStorage.clear();
  }
  
  getProfile() {
    return this.profile();
  }

  isTokenValid(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
  
  getAccessToken() {
    if (typeof localStorage !== "undefined"){
      return localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;
    } 
    return null;
  }

  getUserId(){
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("userId") ? localStorage.getItem("userId") : null;
    }
    return null;
  }
}
