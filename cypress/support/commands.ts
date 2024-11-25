/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        playTheGame: typeof playTheGame;
    }
}

Cypress.Commands.add('playTheGame', playTheGame);

function playTheGame() {
    cy.intercept('GET', 'https://www.swapi.tech/api/people?page=1&limit=100',
        {results: [{uid: '1'}, {uid: '2'}]}
    ).as('people')
    cy.intercept('GET', 'https://www.swapi.tech/api/people/1', 
        {fixture: 'getPerson1.json'}
    ).as('person1')
    cy.intercept('GET', 'https://www.swapi.tech/api/people/2', 
        {fixture: 'getPerson2.json'}
    ).as('person2')
    cy.get('button[data-test-id="playButton"]').click()
    cy.wait('@people')
    cy.wait('@person1')
    cy.wait('@person2')
}
