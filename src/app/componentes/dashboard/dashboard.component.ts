import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthGoogleService } from '../../services/auth/auth-google.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtividadeService } from '../../services/atividade.service';

const MODULES: any[] = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  CommonModule,
  NgOptimizedImage
];
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MODULES],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthGoogleService);
  private router = inject(Router);
  private service = inject(AtividadeService)

  profile = this.authService.profile;
  perfil: WritableSignal<any> = this.service.perfil;

  ngOnInit(): void {
    this.service.login().subscribe({
      next: (data) => {
        console.log(data);
        this.service.setPerfil(data);
        this.perfil.set(data);
        
      }
    })
    console.log(this.profile());
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
