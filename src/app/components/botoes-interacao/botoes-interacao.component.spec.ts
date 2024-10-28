import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoesInteracaoComponent } from './botoes-interacao.component';

describe('BotoesInteracaoComponent', () => {
  let component: BotoesInteracaoComponent;
  let fixture: ComponentFixture<BotoesInteracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotoesInteracaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotoesInteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
