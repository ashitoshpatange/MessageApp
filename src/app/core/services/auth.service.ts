import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/auth.model';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private tokenservice:TokenService) { }

  login(data:ILogin){
      return this.http.post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data).pipe(map((res)=>{
        if(res && res.data.token){
          this.tokenservice.setToken(res.data.token)
        }
        return res;
      }));
  }

  logout(){
    return this.http.get(`${apiEndpoint.AuthEndpoint.logout}`)
    .pipe(map((res)=>{
      if(res){
        this.tokenservice.removeToken();
      }
      return res;
    }));
  }
}
