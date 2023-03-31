import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Inyectamos el configService public para poderlo utilizar en el html y 
  // adicional inyectamos el authService para temas de login
  constructor(public configService: ConfigService, public auth: AuthService) 
  { }

  ngOnInit(): void {
  }

}
