import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Atividade } from '../models/Atividade.model';
import { environment } from '../../environments/environment';
import { AuthGoogleService } from './auth/auth-google.service';


@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
; // Substitua pelo seu endpoint real

private authService = inject(AuthGoogleService);


cursoAtual: BehaviorSubject<any> = new BehaviorSubject<any>(null);

curso: WritableSignal<any> = signal<any>(null);

perfil: WritableSignal<any> = signal<any>(null);

constructor(private http: HttpClient) {}

criarAtividade(atividade: Atividade): Observable<Atividade> {
  return this.http.post<Atividade>(environment.apiUrl, atividade);
}

getHeader(): HttpHeaders{  
  return new HttpHeaders({
    accessToken: `${this.authService.getAccessToken()}`,
  });
}


listarCursos(idProprietario: string): Observable<any> {
    const headers = this.getHeader();
    return this.http.get<Atividade>(`${environment.apiUrl}/curso/${idProprietario}`, {headers});
  }

  listarAtividades(cursoId: string): Observable<any> {
    const headers = this.getHeader();
    return this.http.get<Atividade>(`${environment.apiUrl}/atividade/${cursoId}`, {headers});
  }

  listarTodasAtividades(cursoId: string): Observable<any> {
    const headers = this.getHeader();
    return this.http.get<Atividade>(`${environment.apiUrl}/classroom/fullCoursework/${cursoId}`, {headers});
  }

  listarAtividadesAluno(cursoId: string, userId: string): Observable<any> {
    const headers = this.getHeader();
    
    return this.http.get<Atividade>(`${environment.apiUrl}/classroom/atividade/${cursoId}/${userId}`, {headers});
  }

  login(): Observable<any>{
    const headers = this.getHeader();
    console.log(this.getHeader());
    return this.http.post(`${environment.apiUrl}/usuario/login`, {}, {headers})
  }

  setPerfil(perfil: any) {
    this.perfil.set(perfil);
  }

  setCursoAtual(cursoId: any){
    this.curso.set(cursoId);
    this.cursoAtual.next(cursoId);
  }
}
