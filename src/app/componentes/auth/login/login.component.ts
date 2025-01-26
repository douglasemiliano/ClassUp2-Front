import { Component, inject, OnInit } from '@angular/core';
import { AtividadeService } from '../../../services/atividade.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthGoogleService } from '../../../services/auth/auth-google.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const MODULES: any[] = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  CommonModule
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  private authService = inject(AuthGoogleService);


  features = [
    { icon: 'badge', title: 'Earn Badges', description: 'Unlock achievements for completing classroom activities.' },
    { icon: 'ranking', title: 'Leaderboard', description: 'Compete with classmates and climb the rankings.' },
    { icon: 'classroom', title: 'Classroom Integration', description: 'Seamlessly connects with your Google Classroom.' },
  ];

  testimonials = [
    { name: 'Marsha Singer', role: 'Teacher', quote: 'This gamified system has significantly increased student engagement!' },
    { name: 'Tim Shaw', role: 'Student', quote: 'I love earning badges and competing on the leaderboard!' },
    { name: 'Lindsay Spice', role: 'Parent', quote: 'My child is so much more motivated to learn now!' },
  ];

  constructor(private route: ActivatedRoute){}



  signInWithGoogle() {
    console.log("entrou aq");
    
    this.authService.login();
  }
  
}
