import { Component, OnInit } from '@angular/core';
import { AtividadeService } from '../../../services/atividade.service';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-curso',
  standalone: true,
  imports: [JsonPipe, RouterModule, MatIconModule],
  templateUrl: './listar-curso.component.html',
  styleUrl: './listar-curso.component.scss'
})
export class ListarCursoComponent{

  cursos: any[] = [];
  cursoId: string = "";


  constructor(private service: AtividadeService, private router: Router, private route: ActivatedRoute){
    this.service.listarCursos().subscribe({
      next: (data: any) => {
        this.cursos = data;
        console.log(data);
        
      }, error: (erro: any) => {
        console.log(erro);
        
      }
    })
  }

  entrarNoCurso(curso: any){
    // this.service.setCursoAtual(curso);
    this.router.navigate(["atividades", "curso.id"]);
  }

}
