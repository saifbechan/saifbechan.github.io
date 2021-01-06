describe('index', () => {
  it('displays the footer', () => {
    cy.visit('/');
    cy.get('footer').should('be.visible');
  });

  it('displays a p5 canvas', () => {
    cy.visit('/');
    cy.get('.p5Canvas').should('be.visible');
  });
});

export {};
