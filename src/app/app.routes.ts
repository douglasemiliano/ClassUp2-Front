import { Routes } from '@angular/router';
import { AtividadeFormComponent } from './componentes/atividade-form/atividade-form.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { ListarCursoComponent } from './componentes/curso/listar-curso/listar-curso.component';
import { ListarAtividadeComponent } from './componentes/atividade/listar-atividade/listar-atividade.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { CallbackComponent } from './componentes/auth/callback/callback.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'criar-atividade', component: AtividadeFormComponent },
  { path: '', redirectTo: 'cursos', pathMatch: 'full' },
  { path: 'cursos', component: ListarCursoComponent},
  { path: 'atividades/:id', component: ListarAtividadeComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'perfil', component: DashboardComponent },


];