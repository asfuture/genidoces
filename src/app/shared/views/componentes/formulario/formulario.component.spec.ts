import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormularioComponent } from './formulario.component';  // Importe o componente que você deseja testar

fdescribe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],  // Importe os módulos necessários para o componente
      declarations: [FormularioComponent],  // Declare o componente que você está testando
      providers: [FormBuilder]  // Se houver algum serviço ou provedor necessário, adicione aqui
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
