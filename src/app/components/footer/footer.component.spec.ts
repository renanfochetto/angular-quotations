import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';
import {DebugElement} from "@angular/core";

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', (): void => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a logo', (): void => {
    const logo: DebugElement = fixture.debugElement.query(By.css('.logo-footer'));
    expect(logo).toBeTruthy();
  });

  it('deve criar link corretamente para o Github', (): void => {
    const githubLink: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(githubLink.nativeElement.getAttribute('href')).toBe('https://github.com/renanfochetto');
  });

  it('deve renderizar o ícone do Github', (): void => {
    const githubIcon: DebugElement = fixture.debugElement.query(By.css('.fa-github'));
    expect(githubIcon).toBeTruthy();
  });

  it('deve ter atributo alt para a logo', (): void => {
    const logo: DebugElement = fixture.debugElement.query(By.css('.logo-footer'));
    expect(logo.nativeElement.getAttribute('alt')).toBe('Logo da RNN');
  });

  it('deve ter aria-label para o link do Github', (): void => {
    const githubLink: DebugElement = fixture.debugElement.query(By.css('a'));
    expect(githubLink.nativeElement.getAttribute('aria-label')).toBe('Perfil do Github de Renan Fochetto');
  });

});
