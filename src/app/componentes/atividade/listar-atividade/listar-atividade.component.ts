import { Component, inject } from '@angular/core';
import { AtividadeService } from '../../../services/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthGoogleService } from '../../../services/auth/auth-google.service';

@Component({
  selector: 'app-listar-atividade',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule, NgOptimizedImage],
  templateUrl: './listar-atividade.component.html',
  styleUrl: './listar-atividade.component.scss'
})
export class ListarAtividadeComponent {

  curso: any

  atividades: any[];

  imagem: string = environment.imagemPadraoAtividade;

  alunos = [
    {
      id: '104514671853488482978',
      nome: 'Douglas Emiliano',
      email: 'emaildedouglasparacadastros@gmail.com',
      foto: 'https://lh3.googleusercontent.com/a/ACg8ocIgckjfRCPRei0NHUQ6uwkBD9iGiGoKpOLGhQnpLv-CjVNxBg=mo'
    }
  ];

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private authService = inject(AuthGoogleService);

  profile = this.authService.profile();
  // usuarioLogado = this.authService.idUser();

  private service = inject(AtividadeService);
  cursoAtual = this.service.curso();
  

  IsMyCourse: boolean = false;

  constructor(){    
    this.getIdRoute();
  }

  listarAtividades(idCurso: string, idAluno: string){
    this.service.listarAtividadesAluno(idCurso, idAluno).subscribe({
      next: (data: any) => {
        this.atividades = data;
      }
    })
  }
  
  listarTodasAtividades(idCurso: string){
    this.service.listarTodasAtividades(idCurso).subscribe({
      next: (data: any) => {
        console.log(data);
        
        this.atividades = data;
      }
    })
  }

  getIdRoute() { 
    this.route.params.subscribe((params: any) => {
      if(this.cursoAtual){
        this.IsMyCourse = this.cursoAtual.idProprietario == this.authService.profile().sub;
        if (this.IsMyCourse) {  
          this.listarTodasAtividades(this.cursoAtual.id)
        } else {  
          this.listarAtividades(this.cursoAtual.id, this.authService.profile().sub)
        }
        
      } else {
        this.router.navigate(['cursos']);        
      }
    });
  }

  goToClassroom(link: string){
    if (typeof window !== "undefined") {
      window.open(link, "_blank");
   }
  }

}
