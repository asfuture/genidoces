import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoDocesComponent } from './sessao-doces.component';

describe('SessaoDocesComponent', () => {
  let component: SessaoDocesComponent;
  let fixture: ComponentFixture<SessaoDocesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessaoDocesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessaoDocesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
