import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { AtividadeService } from '../../../services/atividade.service';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthGoogleService } from '../../../services/auth/auth-google.service';

@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [JsonPipe, RouterModule, MatIconModule],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.scss'
})
export class ListarCursoComponent implements AfterViewInit{

  cursos: any[] = [];
  cursoId: string = "";

  private authService = inject(AuthGoogleService);

  profile = this.authService.profile;

  constructor(private service: AtividadeService, private router: Router, private route: ActivatedRoute){

  }
  ngAfterViewInit(): void {    
    if(this.profile()){
      this.service.listarCursos(this.profile().sub).subscribe({
        next: (data: any) => {
          this.cursos = data;
          console.log(data);
          
        }, error: (erro: any) => {
          console.log(erro);
          
        }
      })    
    }
  }

  entrarNoCurso(curso: any){
    this.service.setCursoAtual(curso);
    this.router.navigate(["atividades", curso.id]);
  }

}
