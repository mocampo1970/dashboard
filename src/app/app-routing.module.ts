import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { ResumeComponent } from './components/resume/resume.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginGuardService } from './services/login-guard.service';

// Nota: dentro de las comillas va el nombre del selector del ts sin el app 
//       y ResumeComponent es el nombre del componente en el ts, 
//       se le adiciona LoginGuardService a cada component para que solo la abra si esta logeado.
const routes: Routes = [
  {path: 'resume', component: ResumeComponent, canActivate: [LoginGuardService]},
  {path: 'posts', component: PostsComponent, canActivate: [LoginGuardService]},
  {path: 'categories', component: CategoriesComponent, canActivate: [LoginGuardService]},
  {path: 'add-category', component: AddCategoryComponent, canActivate: [LoginGuardService]},
  {path: 'add-post', component: AddPostComponent, canActivate: [LoginGuardService]},  
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]}, 
  {path: 'signin', component: SigninComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'resume'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
