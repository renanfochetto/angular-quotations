import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FrasesComponent } from './frases.component';
import { FrasesService } from "../../services/frases/frases.service";
import { TraducaoService } from "../../services/traducao/traducao.service";
import { AnimationService } from "../../services/animacoes/animacoes.service";
import { of, throwError } from "rxjs";
import { Frase } from "../../interfaces/frases.interface";

const createMock = <T>() => {
  return {} as jest.Mocked<T>;
};

describe('FrasesComponent', () => {
  let component: FrasesComponent;
  let fixture: ComponentFixture<FrasesComponent>;
  let frasesServiceSpy: jest.Mocked<FrasesService>;
  let traducaoServiceSpy: jest.Mocked<TraducaoService>;
  let animationServiceSpy: jest.Mocked<AnimationService>;

  beforeEach(async () => {
    frasesServiceSpy = createMock<FrasesService>();
    frasesServiceSpy.obterFraseDoDia = jest.fn();

    traducaoServiceSpy = createMock<TraducaoService>();
    traducaoServiceSpy.translate = jest.fn();

    animationServiceSpy = createMock<AnimationService>();
    animationServiceSpy.aplicarFadeIn = jest.fn();

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
    const mockFrase: Frase[] = [{ q: 'Frase de teste', a: 'Autor Teste', h: 'Dica do dia' }];
    frasesServiceSpy.obterFraseDoDia.mockReturnValue(of(mockFrase));

    traducaoServiceSpy.translate.mockReturnValue(
      of({
        responseData: { translatedText: 'Test Quote', match: 100 },
        responseStatus: 200
      })
    );

    component.gerarFraseDoDia();
    tick();

    expect(component.fraseDoDia).toBe('Frase de teste');
    expect(component.autor).toBe('Autor Teste');
    expect(component.fraseTraduzida).toBe('Test Quote');
    expect(animationServiceSpy.aplicarFadeIn).toHaveBeenCalled();
  }));

  it('deve traduzir uma frase quando o idioma selecionado é inglês', fakeAsync(() => {
    component.idiomaSelecionado = 'en';
    const mockFrase = 'Test Quote';

    component.traduzirFrase(mockFrase);

    expect(component.fraseTraduzida).toBe(mockFrase);
    expect(component.isLoading).toBe(false);
  }));

  it('deve traduzir uma frase corretamente quando o idioma selecionado não é inglês', fakeAsync(() => {
    component.idiomaSelecionado = 'pt';
    const mockFrase = 'Frase de teste';
    traducaoServiceSpy.translate.mockReturnValue(
      of({
        responseData: { translatedText: 'Test Quote' , match: 100 },
        responseStatus: 200
      }))
    ;

    component.traduzirFrase(mockFrase);
    tick();

    expect(component.fraseTraduzida).toBe('Test Quote');
    expect(component.isLoading).toBe(false);
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
