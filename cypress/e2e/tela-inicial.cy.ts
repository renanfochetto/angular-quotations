describe('Teste E2E para a Tela Inicial', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Deve redirecionar para a página inicial ao clicar na logo', () => {
    cy.get('.logo a').click();
    cy.url().should('eq', 'http://localhost:4200/');
  })

  it('Deve carregar a frase do dia', () => {
    cy.visit('http://localhost:4200');
    cy.get('#titulo').should('be.visible').contains('Que tal uma citação para o dia de hoje?');
    cy.get('.botao-frase').should('be.visible').contains('Gerar Citação');
  });

  it('Deve gerar uma nova frase ao clicar no botão', () => {
    cy.get('button').contains('Gerar Citação').click();
    cy.get('.frase').should('be.visible');
    cy.get('.autor').should('be.visible');
    cy.get('.container-botoes').should('be.visible');
  });

  it('Deve traduzir a frase ao alterar o idioma', () => {
    cy.get('#titulo').should('contain', 'Que tal uma citação para o dia de hoje?');
    cy.get('.botao-frase').should('contain', 'Gerar Citação');
    cy.get('#idioma-toggle').check({ force: true });
    cy.get('#titulo').should('contain', 'How about a quote for today?');
    cy.get('.botao-frase').should('contain', 'Generate Quote');
    cy.get('#idioma-toggle').uncheck({ force: true });
    cy.get('#titulo').should('contain', 'Que tal uma citação para o dia de hoje?');
    cy.get('.botao-frase').should('contain', 'Gerar Citação');
  });

  it('Deve voltar para o idioma original ao desmarcar o toggle', () => {
    cy.get('#idioma-toggle').check({ force: true });
    cy.get('#idioma-toggle').uncheck({ force: true });
    cy.get('#titulo').should('contain', 'Que tal uma citação para o dia de hoje?');
    cy.get('.botao-frase').should('contain', 'Gerar Citação');
  });

  it('Deve redirecionar para a página do GitHub ao clicar no link', () => {
    cy.get('footer a')
      .should('have.attr', 'href', 'https://github.com/renanfochetto')
      .then(($a) => {
        const url = $a.prop('href');
        cy.visit(url);
      });
  });
});
