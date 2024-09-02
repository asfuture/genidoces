
import { CardService } from './../../../services/card.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-criar-card',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './criar-card.component.html',
  styleUrls: ['./criar-card.component.css'],
  providers: [HttpClient]
})
export class CriarCardComponent implements OnInit, OnDestroy {
  criarCard!: FormGroup;
  imagemPreview: string | ArrayBuffer | null = null;
  selectedFile!: File;
  url:string ='';
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cardService: CardService,
    private storage: Storage
  ) {}

  ngOnInit(): void {
    this.criarCard = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      link: ['', Validators.required], 
      whatsapp: ['', [Validators.required]],
      imagem: ['']
    });
  }

  //Converter imagem para base64 e adicionar ao modelo card/post
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

  async onSubmit() {
   await this.hospedarImagemFirebase()
     setTimeout(() => {
      this.saveCard()
     },5000);
  }

  //Criar url da imagem no storage firebase
  async hospedarImagemFirebase() {
    if (this.selectedFile) {
      const path = `img/${this.selectedFile.name}`;
      const storageRef = ref(this.storage, path);
      const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);
      uploadTask.on(
        'state_changed',
        snapshot => {
          // progresso do upload (opcional)
        },
        error => {
          console.error("Erro ao fazer upload:", error);
        },
        async () => {
          this.url = await getDownloadURL(storageRef);
          console.log("URL do Firebase:", this.url);
        }
      );
    }
   }

  saveCard(): void {
    if (this.criarCard.valid) {
      const valorCard = this.criarCard.value;
            valorCard.imagem = this.url;
      
       this.cardService.post(valorCard).pipe(
        takeUntil(this.unsubscribe)
       ).subscribe({
         next: (resultado) => {
           console.log('Card criado com sucesso:', resultado);
         },
         error: (error) => {
           console.log('Erro ao criar card', error);
         }
       });
       this.criarCard.reset();
       this.imagemPreview = '';
     }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
