import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FrasesComponent } from './frases.component';
import { FrasesService } from "../../services/frases.service";
import { TraducaoService } from "../../services/traducao.service";
import { AnimationService } from "../../services/animacoes.service";
import { of, throwError } from "rxjs";

describe('FrasesComponent', () => {
  let component: FrasesComponent;
  let fixture: ComponentFixture<FrasesComponent>;
  let frasesServiceSpy: any;
  let traducaoServiceSpy: any;
  let animationServiceSpy: any;

  beforeEach(async () => {
    frasesServiceSpy = { obterFraseDoDia: jest.fn() };
    traducaoServiceSpy = { translate: jest.fn() };
    animationServiceSpy = { aplicarFadeIn: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [FrasesComponent, HttpClientTestingModule],
      providers: [
        { provide: FrasesService, useValue: frasesServiceSpy },
        { provide: TraducaoService, useValue: traducaoServiceSpy },
        { provide: AnimationService, useValue: animationServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FrasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve atualizar o idioma para português', () => {
    component.atualizarIdioma('pt');
    expect(component.idiomaSelecionado).toBe('pt');
    expect(component.titulo).toBe('Que tal uma citação para o dia de hoje?');
    expect(component.botaoTexto).toBe('Gerar Citação');
  });

  it('deve atualizar o idioma para inglês', () => {
    component.atualizarIdioma('en');
    expect(component.idiomaSelecionado).toBe('en');
    expect(component.titulo).toBe('How about a quote for today?');
    expect(component.botaoTexto).toBe('Generate Quote');
  });

  it('deve obter uma frase do dia com sucesso e aplicar fade-in', fakeAsync(() => {
    const mockFrase = [{ q: 'Frase de teste', a: 'Autor Teste' }];
    frasesServiceSpy.obterFraseDoDia.mockReturnValue(of(mockFrase));

    traducaoServiceSpy.translate.mockReturnValue(of({ responseData: { translatedText: 'Test Quote' } }));

    component.gerarFraseDoDia();
    tick();

    expect(component.fraseDoDia).toBe('Frase de teste');
    expect(component.autor).toBe('Autor Teste');
    expect(component.fraseTraduzida).toBe('Test Quote');
    expect(animationServiceSpy.aplicarFadeIn).toHaveBeenCalled();
  }));

  it('deve traduzir uma frase quando o idioma selecionado é inglês', fakeAsync(() => {
    component.idiomaSelecionado = 'en'; // Define o idioma como inglês
    const mockFrase = 'Test Quote';

    component.traduzirFrase(mockFrase); // Chama o método

    expect(component.fraseTraduzida).toBe(mockFrase); // Verifica se a frase traduzida é igual à original
    expect(component.isLoading).toBe(false); // Verifica se isLoading é false
  }));

  it('deve traduzir uma frase corretamente quando o idioma selecionado não é inglês', fakeAsync(() => {
    component.idiomaSelecionado = 'pt'; // Define o idioma como português
    const mockFrase = 'Frase de teste';
    traducaoServiceSpy.translate.mockReturnValue(of({ responseData: { translatedText: 'Test Quote' } }));

    component.traduzirFrase(mockFrase); // Chama o método
    tick(); // Avança o tempo para processar a chamada assíncrona

    expect(component.fraseTraduzida).toBe('Test Quote'); // Verifica se a frase foi traduzida corretamente
    expect(component.isLoading).toBe(false); // Verifica se isLoading é false
  }));

  it('deve trata um erro ao obter a frase do dia', () => {
    frasesServiceSpy.obterFraseDoDia.mockReturnValue(throwError(() => new Error('Erro ao obter a frase do dia')));

    jest.spyOn(console, 'error').mockImplementation(() => {});
    component.gerarFraseDoDia();

    expect(console.error).toHaveBeenCalled();
  });

  it('deve tratar um erro ao traduzir uma frase', () => {
    const mockFrase = 'Test Quote';
    traducaoServiceSpy.translate.mockReturnValue(throwError(() => new Error('Erro ao traduzir a frase')));

    jest.spyOn(console, 'error');
    component.traduzirFrase(mockFrase);

    expect(console.error).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });

  it('deve mostrar o componente Loading enquanto isLoading for true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loading = fixture.nativeElement.querySelector('.loading');
    expect(loading).toBeTruthy();
  });

  it('deve aplicar a classe fade-in ao elemento', () => {
    component.fraseTraduzida = 'Test Quote';
    component.aplicarFadeIn();
    fixture.detectChanges();

    const fraseTraduzida = fixture.nativeElement.querySelector('.frase');
    expect(fraseTraduzida).not.toBeNull();
    expect(fraseTraduzida.classList).toContain('fade-in');
  });
})
