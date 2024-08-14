import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCardComponent } from './criar-card.component';

describe('CriarCardComponent', () => {
  let component: CriarCardComponent;
  let fixture: ComponentFixture<CriarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
