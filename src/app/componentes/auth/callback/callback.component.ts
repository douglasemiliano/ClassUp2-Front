import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthGoogleService } from '../../../services/auth/auth-google.service';
import { OAuthService } from 'angular-oauth2-oidc';

const MODULES: any[] = [
  MatButtonModule,
  MatIconModule,
  RouterModule,
  CommonModule
];

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [MODULES],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent implements AfterViewChecked{

  private router = inject(Router);

  private oAuthService = inject(OAuthService);
  constructor(private route: ActivatedRoute) { }

  // ngOnInit() {
  //   // Extrair o token do fragmento da URL
  //   this.route.fragment.subscribe((fragment) => {
  //     if (fragment) {
  //       const params = new URLSearchParams(fragment);
  //       const accessToken = params.get('access_token');
        
  //       if (accessToken) {
  //         // Enviar o token de volta à janela original
  //         window.opener.postMessage({ token: accessToken, status: 'login-success' }, window.location.origin);
  //         // Fechar a janela de callback
  //         window.close();
  //       }
  //     }
  //   });
  // }

  ngAfterViewChecked(): void {
      setTimeout(() => {
        this.router.navigate(["perfil"])
      }, 2000);
      
  }
}
