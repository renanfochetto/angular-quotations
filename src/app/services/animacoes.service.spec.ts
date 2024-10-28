import { TestBed } from '@angular/core/testing';
import { AnimationService } from './animacoes.service';

describe('AnimationService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);

    (window as any).requestAnimationFrame = jest.fn((callback) => {
      callback(0);
      return 0;
    }) as unknown as typeof requestAnimationFrame;
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve aplicar fade-in em um elemento', () => {
    const element = document.createElement('div');
    element.classList.remove('fade-in');
    expect(element.classList.contains('fade-in')).toBeFalsy();
    service.aplicarFadeIn(element);
    expect(element.classList.contains('fade-in')).toBeTruthy();
  });

  it('não deve fazer nada se o elemento for nulo', () => {
    const element: HTMLElement | null = null;
    expect(() => service.aplicarFadeIn(element)).not.toThrow();
  })
});
