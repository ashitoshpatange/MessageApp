import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  isAuthenticate$!: Observable<boolean>;

  constructor(private authservice:AuthService, private tokenservice:TokenService){
    this.isAuthenticate$ = this.tokenservice.isAuthentication;
  }

  

  onLogout(){
    this.authservice.logout().subscribe({
      next(){
      }
    });
  }

}
