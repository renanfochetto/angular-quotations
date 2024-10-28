import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  aplicarFadeIn(element: HTMLElement | null): void {
    if (element) {
      element.classList.remove('fade-in');
      element.offsetWidth; // Força a reflow
      requestAnimationFrame((): void => {
        element.classList.add('fade-in');
      });
    }
  }
}
