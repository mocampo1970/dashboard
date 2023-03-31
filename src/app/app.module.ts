// angular
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';           // Se debe importar cada que se vaya a hacer un 
                                                        //formularios basados ​​en plantillas
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from '@angular/fire/database';
//import { ChartModule } from 'primeng/chart';

// module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateService } from './services/translate.service';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ResumeComponent } from './components/resume/resume.component';
import { WidgetComponent } from './components/dashboard/widget/widget.component';
import { WidgetStadisticsComponent } from './components/dashboard/widget/widget-stadistics/widget-stadistics.component';
import { WidgetLastCommentsComponent } from './components/widget/widget-last-comments/widget-last-comments.component';
import { WidgetLastVisitsComponent } from './components/widget/widget-last-visits/widget-last-visits.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { WidgetSelectCategoryComponent } from './components/widget/widget-select-category/widget-select-category.component';

// services y pipes
import { TranslatePipe } from './pipes/translate.pipe';
import { ConfigService } from './services/config.service';
import { HighlightDirective } from './directives/highlight.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { WidgetUploadThumbnailComponent } from './components/widget/widget-upload-thumbnail/widget-upload-thumbnail.component';
import { JoinPipe } from './pipes/join.pipe';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

// Para la traducción en el archivo es-419.json se crea un servicio que se llama translate.service
// para no tenerlo que hacer se puede copiar desde proyecto4 y pegarlo dentro una carpeta 
// nueva que se llama app/services/ y aqui se debe declarar y en este mismo archivo
// en el provider, el APP_INITIALIZER el saca error pero lo importa arriba.
export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

// En el provider se realiza el proceso de inicializar tanto el traslado como la configuración
// inicial, en este caso para el config y abajo en el provider se hace lo mismo.
export function configFactory(provider: ConfigService) {
  return () => provider.getData();
}

// Lo trajimos de la pagina de firebase, creando el proyecto (DDR-Blog-app) luego voy a configuración del 
// proyecto en la parte superior, le doy un nombre le coloque test que es <> al nombre del proyecto
// y firebase me da estos datos.
//const firebaseConfig = {
//  apiKey: "AIzaSyCRFP32QXiCbXSpWSFqmyJJxkndzflEtk4",
//  authDomain: "ddr-blog-app-8417d.firebaseapp.com",
//  projectId: "ddr-blog-app-8417d",
//  storageBucket: "ddr-blog-app-8417d.appspot.com",
//  messagingSenderId: "984829501938",
//  appId: "1:984829501938:web:aed0d329ab68760c644b6b",
//  measurementId: "G-C03K8NFCS3"
//};

//    AngularFireModule.initializeApp(firebaseConfig),
//    AngularFireDatabaseModule

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    SidebarComponent,
    DashboardComponent,
    PostsComponent,
    CategoriesComponent,
    ResumeComponent,
    WidgetComponent,
    WidgetStadisticsComponent,
    WidgetLastCommentsComponent,
    WidgetLastVisitsComponent,
    AddCategoryComponent,
    HighlightDirective,
    FilterPipe,
    AddPostComponent,
    WidgetSelectCategoryComponent,
    WidgetUploadThumbnailComponent,
    JoinPipe,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
