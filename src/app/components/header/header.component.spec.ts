import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', (): void => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o elemento logo como um elemento h1', (): void => {
    const h1: HTMLElement = fixture.debugElement.query(By.css('.logo')).nativeElement;
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe('Visual Quotes');
  })

  it('deve emitir um evento ao mudar de idioma', (): void => {
    const emitSpy = jest.spyOn(component.idiomaMudou, 'emit');
    const checkbox: DebugElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));

    checkbox.nativeElement.click();
    fixture.detectChanges();

    expect(emitSpy.emit).toHaveBeenCalledWith('en');

    expect(component.idiomaSelecionado).toBe('en');

    checkbox.nativeElement.click();
    fixture.detectChanges();

    expect(component.idiomaMudou.emit).toHaveBeenCalledWith('pt');
    expect(component.idiomaSelecionado).toBe('pt');
  });

  it('deve mostrar a opção de idioma correta como ativa', (): void => {
    let activeOption = fixture.debugElement.query(By.css('.lang-option.active'));

    expect(activeOption).toBeTruthy();
    expect(activeOption.nativeElement.textContent.trim()).toBe('PT');

    const checkbox: DebugElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    checkbox.nativeElement.click();
    fixture.detectChanges();

    activeOption = fixture.debugElement.query(By.css('.lang-option.active'));
    expect(activeOption).toBeTruthy();
    expect(activeOption.nativeElement.textContent.trim()).toBe('EN');
  });

  it('deve ter o aria-label correto no logo', () => {
    const logo: HTMLElement = fixture.debugElement.query(By.css('.logo')).nativeElement;

    expect(logo.getAttribute('aria-label')).toBe('Logo do Visual Quotes');
  });

  it('deve ter o aria-label correto no seletor de idioma', () => {
    const container: HTMLElement = fixture.debugElement.query(By.css('.seletor-container')).nativeElement;
    expect(container.getAttribute('aria-label')).toBe('Selecionar Idioma');
  });

  it('deve ter o checkbox correto baseado no idioma selecionado', () => {
    const checkbox: DebugElement = fixture.debugElement.query(By.css('input[type="checkbox"]'));

    expect(checkbox.nativeElement.checked).toBe(component.idiomaSelecionado === 'en');
  });

  it('deve atualizar corretamente o estado visual ao mudar de idioma', () => {
    component.idiomaSelecionado = 'pt';
    fixture.detectChanges();

    let activeOption = fixture.debugElement.query(By.css('.lang-option.active'));
    expect(activeOption.nativeElement.textContent.trim()).toBe('PT');

    component.atualizarIdioma();
    fixture.detectChanges();

    activeOption = fixture.debugElement.query(By.css('.lang-option.active'));
    expect(activeOption.nativeElement.textContent.trim()).toBe('EN');
  });

  it('deve aplicar a classe active corretamente', () => {
    component.idiomaSelecionado = 'en';
    fixture.detectChanges();

    const activeOption = fixture.debugElement.query(By.css('.lang-option.active'));
    expect(activeOption.nativeElement.textContent.trim()).toBe('EN');

    component.atualizarIdioma();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.lang-option.active')).nativeElement.textContent.trim()).toBe('PT');
  });

  it('deve capturar erros ao atualizar o idioma', () => {
    jest.spyOn(component.idiomaMudou, 'emit').mockImplementation(() => { throw new Error('Erro de teste'); });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.atualizarIdioma();

    expect(consoleSpy).toHaveBeenCalledWith('Erro ao atualizar o idioma:', expect.any(Error));

    consoleSpy.mockRestore();
  });
});
