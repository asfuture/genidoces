import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,],
  templateUrl: './criar-card.component.html',
  styleUrl: './criar-card.component.css',
  providers:[HttpClient]
})
export class CriarCardComponent implements OnInit {
  criarCard!:FormGroup;

  imagemPreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder:FormBuilder,){}
  ngOnInit(): void {
    this.criarCard = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      link: ['', Validators.required], 
      whatsapp: ['', [Validators.required]],
      imagem: ['', [Validators.required]]
   });

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
        this.criarCard.patchValue({
          imagem: file.name // ou você pode armazenar o caminho, dependendo da sua lógica
        });
      };
      reader.readAsDataURL(file);
    }
  }
  
  onSubmit(){
    const novoCard = this.criarCard.value
    console.log("Card novo ",novoCard );
  }
}
