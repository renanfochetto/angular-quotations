describe('Teste E2E de Interações com a Frase do Dia', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
    cy.get('button').contains('Gerar Citação').click();
  });

  it('Deve carregar uma nova a frase do dia ao clicar no botão', () => {
    cy.get('.frase').should('be.visible');
    cy.get('.autor').should('be.visible');
    cy.get('.container-botoes').should('be.visible');
    cy.get('.botao-frase').should('be.visible').contains('Gerar Citação');
    cy.get('button').contains('Gerar Citação').click();
    cy.get('.frase').should('be.visible');
    cy.get('.autor').should('be.visible');
    cy.get('.container-botoes').should('be.visible');
    cy.get('.botao-frase').should('be.visible').contains('Gerar Citação');
  });

  it('Deve traduzir a frase do botão ao alterar o idioma', () => {
    cy.get('.botao-frase').should('contain', 'Gerar Citação');
    cy.get('#idioma-toggle').check({ force: true });
    cy.get('.botao-frase').should('contain', 'Generate Quote');
    cy.get('#idioma-toggle').uncheck({ force: true });
    cy.get('.botao-frase').should('contain', 'Gerar Citação');
  });
});
