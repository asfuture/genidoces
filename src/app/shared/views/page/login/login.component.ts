import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[HttpClient]
})
export class LoginComponent {

  login:any = FormGroup;

  constructor( private formBuilder:FormBuilder ){}

  onSubmit() {
    
    }
}

