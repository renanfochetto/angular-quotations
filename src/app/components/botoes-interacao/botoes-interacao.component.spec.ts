import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotoesInteracaoComponent } from './botoes-interacao.component';

describe('BotoesInteracaoComponent', ():void => {
  let component: BotoesInteracaoComponent;
  let fixture: ComponentFixture<BotoesInteracaoComponent>;

  beforeEach(async ():Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [BotoesInteracaoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BotoesInteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockResolvedValue(Promise.resolve())
      },
      writable: true
    });
  });

  it('deve ser criado', (): void => {
    expect(component).toBeTruthy();
  });

  it('deve alternar o estado de curtido e emitir evento ao clicar em curtir', ():void => {
    jest.spyOn(component.curtir, 'emit');
    expect(component.curtido).toBeFalsy();

    component.alternarCurtir();

    expect(component.curtido).toBeTruthy();
    expect(component.curtir.emit).toHaveBeenCalled();
  });

  it('deve copiar a frase e emitir um evento ao clicar em copiar', async ():Promise<void> => {
    const texto = 'Frase de Teste';
    component.fraseTraduzida = texto;
    jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(Promise.resolve());
    jest.spyOn(component.copiar, 'emit');

    await component.copiarFrase();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(texto);
    expect(component.copiado).toBeTruthy();

    await new Promise(resolve  => setTimeout(resolve, 600));
    expect(component.copiado).toBeFalsy();
    expect(component.copiar.emit).toHaveBeenCalled();
  });

  it('deve emitir um evento ao clicar em compartilhar', (): void => {
    jest.spyOn(component.compartilhar, 'emit');

    component.compartilharFrase();

    expect(component.compartilhar.emit).toHaveBeenCalled();
  });

  it('deve lidar com erro ao tentar copiar a frase', async (): Promise<void> => {
    const texto = 'Frase de Teste';
    component.fraseTraduzida = texto;

    // Simula um erro na função writeText
    jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Falha ao copiar'));
    console.error = jest.fn(); // Espiona console.error para verificar se foi chamado

    await component.copiarFrase();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(texto);
    expect(component.copiado).toBeFalsy(); // Deve continuar como false, já que a cópia falhou
    expect(console.error).toHaveBeenCalledWith('Erro ao copiar a frase: ', expect.any(Error)); // Verifica se o erro foi tratado
  });

});
