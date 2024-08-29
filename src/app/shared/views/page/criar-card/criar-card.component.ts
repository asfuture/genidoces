import { CardService } from './../../../services/card.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
//import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFireStorageModule } from '@angular/fire/compat/storage';
//import { environment } from '../../../../environments/environment';
//import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

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
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cardService: CardService,
    //private storage: AngularFireStorage
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
  //   if (this.selectedFile) {
  //     const filePath = `images/${this.selectedFile.name}`;
  //     const fileRef = this.storage.ref(filePath);
  //     const task = this.storage.upload(filePath, this.selectedFile);

  //     task.snapshotChanges().pipe(
  //       finalize(() => {
  //         fileRef.getDownloadURL().subscribe((url) => {
  //           this.criarCard.patchValue({ imagem: url });
  //           this.saveCard();
  //         });
  //       })
  //     ).subscribe();
  //   } else {
  //     this.saveCard();
  //   }
   }

  saveCard(): void {
    if (this.criarCard.valid) {
      const criarCard = this.criarCard.value;
      console.log("Formulário", criarCard);

      this.cardService.post(criarCard).pipe(
        takeUntil(this.unsubscribe)
      ).subscribe({
        next: (resultado) => {
          console.log('Card criado com sucesso:', resultado);
        },
        error: (error) => {
          console.log('Erro ao criar card', error);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
