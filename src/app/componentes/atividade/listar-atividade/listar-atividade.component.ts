import { Component, inject } from '@angular/core';
import { AtividadeService } from '../../../services/atividade.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthGoogleService } from '../../../services/auth/auth-google.service';

@Component({
  selector: 'app-listar-atividade',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatIconModule],
  templateUrl: './listar-atividade.component.html',
  styleUrl: './listar-atividade.component.scss'
})
export class ListarAtividadeComponent {

  curso: any

  atividades: any[] = [];

  imagem: string = environment.imagemPadraoAtividade;

  items = [
    {
      image: 'https://img.freepik.com/vetores-gratis/floresta-na-hora-do-por-do-sol-cena-da-paisagem_1308-62703.jpg?semt=ais_hybrid', // Caminho para a imagem do primeiro item
    },
    {
      image: 'https://img.freepik.com/vetores-premium/dinossauros-de-desenhos-animados-em-paisagem-na-floresta-era-pre-historica_9645-3668.jpg', // Caminho para a imagem do segundo item
    },
    {
      image: 'https://img.freepik.com/vetores-gratis/fundo-de-galaxia-desenhado-a-mao_23-2150899931.jpg', // Caminho para a imagem do terceiro item
    },
    {
      image: 'https://img.freepik.com/fotos-premium/uma-ilustracao-de-desenho-animado-de-uma-cena-de-praia-com-o-oceano-e-uma-cena-de-praia_1160834-4098.jpg?semt=ais_hybrid', // Caminho para a imagem do quarto item
    },
    {
      image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/39379971-desenho-animado-futurista-cidade-noite-panorama-com-neon-claro-cyberpunk-futuro-metropole-rua-com-arranha-ceus-ficcao-paisagem-urbana-cena-vetor.jpg', // Caminho para a imagem do quinto item
    }]

  private route = inject(ActivatedRoute);

  private authService = inject(AuthGoogleService);

  profile = this.authService.profile;

  constructor(private service: AtividadeService){
    this.getIdRoute();
    this.service.cursoAtual.subscribe({
      next: (data: any) => {
        this.curso = data;
        // this.listarAtividades(data.id);
      }
    })
  }

  listarAtividades(idCurso: string){
    this.service.listarMinhasAtividades(idCurso, this.authService.getUserId()!).subscribe({
      next: (data: any) => {
        this.atividades = data;
        console.log(data);
      }
    })
  }

  getIdRoute() {
    this.route.params.subscribe((params: any) => {
      this.listarAtividades(params.id)
      
    })
  }

  goToClassroom(link: string){
    if (typeof window !== "undefined") {
      window.open(link, "_blank");
   }
  }

}
