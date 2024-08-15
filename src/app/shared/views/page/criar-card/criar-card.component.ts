import { CardService } from './../../../services/card.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-criar-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './criar-card.component.html',
  styleUrls: ['./criar-card.component.css'],
  providers: [HttpClient]
})
export class CriarCardComponent implements OnInit {
  criarCard!: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;
  selectedFile!: File;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cardService:CardService) {}
    private unsubscribe = new Subject<void>();
    
  ngOnInit(): void {
    this.criarCard = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      link: ['', Validators.required], 
      whatsapp: ['', [Validators.required]],
      imagem: [''] // A imagem não é necessária no FormGroup para o envio
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagemPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('titulo', this.criarCard.get('titulo')?.value);
    formData.append('descricao', this.criarCard.get('descricao')?.value);
    formData.append('link', this.criarCard.get('link')?.value);
    formData.append('whatsapp', this.criarCard.get('whatsapp')?.value);

    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile, this.selectedFile.name);
    }

    if(this.criarCard){
      const criarCard = this.criarCard.value
      console.log("formulário", criarCard);

        this.cardService.post(criarCard).pipe(
          takeUntil(this.unsubscribe)
        ).subscribe({
          next: (resultado) => {
          console.log(resultado);
          },
          error:(error) => {
            console.log('Erro ao criar card', error)
          }
      });
    }
  }  
}
