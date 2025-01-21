import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

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

  ngAfterViewChecked(): void {
      setTimeout(() => {
        this.router.navigate(["perfil"])
      }, 5000);
      
  }
}
