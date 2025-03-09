describe('Email Template Previewer', () => {
  beforeEach(() => {
    // Intercept templates API call and alias it before visiting the page
    cy.intercept('GET', '/templates', { fixture: 'templates.json' }).as('getTemplates');

    // Visit the homepage
    cy.visit('http://localhost:3000');
  });

  it('loads the homepage and displays the title', () => {
    cy.contains('AWeber Template Previewer').should('be.visible');
  });

  it('selects a template and displays its preview', () => {
    // Wait for the templates API call to complete
    cy.wait('@getTemplates');

    // Open the Material-UI dropdown
    cy.get('#select-template').click();

    // Wait for dropdown options to be visible
    cy.get('[role="option"]').should('be.visible');

    // Select an option from the dropdown by its text
    cy.get('[role="option"]').contains('Mock Template').click();

    // Verify that the preview is displayed
    cy.contains('Preview').should('be.visible');
  });

  it('submits a template successfully', () => {
    // Intercept the POST request for form submission
    cy.intercept('POST', '/submissions', { statusCode: 200 }).as('submitForm');

    // Select a template (if needed)
    cy.get('#select-template').click();
    cy.get('[role="option"]').contains('Mock Template').click();

    // Click submit button
    cy.get('[type="submit"]').click();

    // Wait for form submission to complete
    cy.wait('@submitForm')
      .its('response.statusCode')
      .should('eq', 200);

    // Verify success notification is displayed
    cy.contains('Template submitted successfully!').should('be.visible');
  });
});
