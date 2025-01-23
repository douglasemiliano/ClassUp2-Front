import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthGoogleService } from './services/auth/auth-google.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  private router = inject(Router)
  private authService = inject(AuthGoogleService)
  private route = inject(ActivatedRoute);
  activeButton: string = 'home';


  title = 'ClassUp2-frontend';

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeButton = this.router.url.replace('/', '');
        console.log("aq", this.activeButton);
        
      }
    });
  }

  goToCursos() {
    this.router.navigate(['cursos']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToPerfil() {
    this.router.navigate(['perfil']);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
  }
}
