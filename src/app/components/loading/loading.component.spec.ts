import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { By } from '@angular/platform-browser';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o icone de loading', () => {
    const icon = fixture.debugElement.query(By.css('i.fa-spinner'));
    expect(icon).toBeTruthy();
  });

  it('deve ter a definição de role e aria-label', () => {
    const icon = fixture.debugElement.query(By.css('.loading'));
    expect(icon.nativeElement.getAttribute('role')).toBe('status');
    expect(icon.nativeElement.getAttribute('aria-live')).toBe('assertive');
  });
});
