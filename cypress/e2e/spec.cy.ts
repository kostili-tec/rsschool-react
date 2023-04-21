import '@cypress/code-coverage/support';

describe('e2e tests', () => {
  it('successfully loads Main page and have 30 cards', () => {
    cy.visit('/');
    cy.contains('Main Page');
    cy.get('[data-cy="unsplash-card"]').should('have.length', 30);
/*     cy.contains('Main Page').click();
    cy.contains('About Us').click();
    cy.url().should('include', '/about');
    cy.contains(/Welcome to the About page/i);
    cy.contains('Form').click();
    cy.url().should('include', '/form'); */
  })
})