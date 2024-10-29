describe('Teste E2E de Interações com os Botões', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('button').contains('Gerar Citação').click();
  });

  it('Deve copiar a frase ao clicar no botão de copiar', () => {
    cy.get('button').contains('Gerar Citação').click();
    cy.get('.frase').invoke('text').then((fraseCopiada) => {
      fraseCopiada = fraseCopiada.replace(/"/g, '').trim();
      cy.get('.fa-copy').click();
      cy.get('body').click();
      cy.window().then((win) => {
        cy.wrap(win.navigator.clipboard.readText()).then((textoCopiado) => {
          console.log('Texto copiado:', textoCopiado);
          console.log('Frase esperada:', fraseCopiada);
          expect(textoCopiado).to.include(fraseCopiada);
        });
      });
    });
  });

  it('Deve exibir ícone de check ao copiar', () => {
    cy.get('.fa-copy').click();
    cy.get('.fa-check').should('be.visible');
    cy.wait(500);
    cy.get('.fa-copy').should('be.visible');
    cy.get('.fa-check').should('not.exist');
  });

  it('Deve alternar entre coração cheio e vazio ao clicar no botão de curtir', () => {
    const botaoCurtir = cy.get('button[aria-label="Curtir"]');
    botaoCurtir.find('i.fa-regular').should('be.visible');
    botaoCurtir.click();
    cy.get('button[aria-label="Curtir"] i.fa-solid').should('be.visible');
    botaoCurtir.click();
    cy.get('button[aria-label="Curtir"] i.fa-regular').should('be.visible');
  });
});
