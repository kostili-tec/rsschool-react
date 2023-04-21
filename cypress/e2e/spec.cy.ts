import '@cypress/code-coverage/support';

describe('e2e tests', () => {
  it('change pages by click on nav', () => {
    cy.visit('/');
    cy.contains('About Us').click();
    cy.url().should('include', '/about');
    cy.contains(/Welcome to the About page/i);
    cy.contains('Form').click();
    cy.url().should('include', '/form');
  }),

  it('loads Main page and have 30 cards', () => {
    cy.visit('/');
    cy.contains('Main Page');
    cy.get('[data-cy="unsplash-card"]').should('have.length', 30);
    cy.contains('Main Page').click();
    cy.contains('About Us').click();
    cy.url().should('include', '/about');
    cy.contains(/Welcome to the About page/i);
    cy.contains('Form').click();
    cy.url().should('include', '/form');
  }),

  it('search new photos and resotre search value after change page', () => {
    cy.visit('/');
    cy.get('[type="text"]').type('stockings');
    cy.get('[type="submit"]').click();
    cy.get('[data-cy="unsplash-card"]').should('have.length', 30);
    cy.contains('About Us').click();
    cy.contains('Main Page').click();
    cy.get('[type="text"]').should('have.value', 'stockings');
  }),

  it('open and close modal', () => {
    cy.visit('/');
    cy.get('[data-cy="unsplash-card"]').first().click();
    cy.contains('Views').should('be.visible');
    cy.contains('Downloads').should('be.visible');
    cy.contains('Download').should('be.visible');
    cy.contains('Created on').should('be.visible');
    cy.get('[data-cy="close-modal"]').click();
    cy.contains('Views').should('not.exist');
  }),

  it('error messages should be displayed when input is not validated, and deleted when validated', () => {
    cy.visit('/form');
    cy.get('[type="submit"]').click();
    cy.contains('You must specify the name').should('be.visible');
    cy.contains('You must select a category').should('be.visible');
    cy.contains('You must specify the price').should('be.visible');
    cy.get('[type="text"]').type('Test Title');
    cy.get('[type="submit"]').click();
    cy.contains('You must specify the name').should('not.exist');
  }),
  
  it('create form card', () => {
    cy.visit('/form');
    cy.get('[type="text"]').type('Lateralus');
    cy.get('select').select('laptops');
    cy.get('[type="number"]').type('666');
    cy.get('[type="date"]').type('2012-12-12');
    cy.get('[type="checkbox"]').first().check();
    cy.get('[type="radio"]').first().check();
    cy.get('[type="file"]').selectFile('src/assets/backgroundAuthorize.jpg');
    cy.get('textarea').type('Black then white are all I see in my infancy');
    cy.get('[type="submit"]').click();
    cy.contains('Lateralus').should('be.visible');
    cy.contains('Black then white are all I see in my infancy').should('be.visible');
    cy.contains('Category: laptops').should('be.visible');
    cy.contains('Extra present: Sticker').should('be.visible');
    cy.contains('Сondition: Used').should('be.visible');
    cy.contains('Production date: 2012-12-12').should('be.visible');
    cy.contains('$ 666').should('be.visible');
  })
})