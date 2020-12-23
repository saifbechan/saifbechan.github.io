it('loads examples', () => {
  cy.visit('/');
  cy.get('.p5Canvas').should('be.visible');
});
