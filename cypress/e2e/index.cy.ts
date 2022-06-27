import Agent = Cypress.Agent;
import Sinon from 'cypress/types/sinon';

let spy: Agent<Sinon.SinonSpy>;
Cypress.on('window:before:load', (win) => {
  spy = cy.spy(win.console, 'error');
});

describe('index', () => {
  it('displays the footer', () => {
    cy.visit('/');
    cy.get('footer').should('be.visible');
  });

  it('displays a p5 canvas', () => {
    cy.visit('/');
    cy.get('.p5Canvas').should('be.visible');
  });

  it('does not log any errors', () => {
    cy.wait(100).then(() => {
      expect(spy).not.to.be.called;
    });

    cy.wrap({}).should(() => {
      expect(spy).not.to.be.called;
    });

    expect(spy).not.to.be.called;
  });
});

export {};
