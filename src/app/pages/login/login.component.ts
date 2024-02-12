import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/component/card/card.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    
  loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private authservice:AuthService){}
  ngOnInit(): void {
       this.loginForm = this.fb.group({
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl('',[Validators.required])
       })

     }


     onSubmit(){
      if(this.loginForm.valid){
        console.log(this.loginForm.value);
        this.authservice.login(this.loginForm.value).subscribe({
          next(value){
            console.log(value);
            
          }
        })
        
      }else{
        this.loginForm.markAllAsTouched;
      }
     }
}
