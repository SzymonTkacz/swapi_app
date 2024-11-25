function playTheGame(){    
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

describe('play the game', () => {
    it('should play the game and check if data is correct', () => {
        cy.visit('http://localhost:4200/')
        playTheGame()

        cy.get("span[id='personName1']").should("have.text","Jocasta Nu");
        cy.get("span[id='mass1']").should("have.text","78");
        cy.get("span[id='birthYear1']").should("have.text","unknown");
        cy.get("span[id='personCreated1']").should("have.text","Nov 24, 2024");
        cy.get("span[id='personEdited1']").should("have.text","Nov 24, 2024");
        cy.get("span[id='eyeColor1']").should("have.text","blue");
        cy.get("span[id='gender1']").should("have.text","female");
        cy.get("span[id='hairColor1']").should("have.text","white");
        cy.get("span[id='height1']").should("have.text","167");
        cy.get("span[id='skinColor1']").should("have.text","fair");

        cy.get("span[id='personName2']").should("have.text","Wicket Systri Warrick");
        cy.get("span[id='mass2']").should("have.text","20");
        cy.get("span[id='birthYear2']").should("have.text","8BBY");
        cy.get("span[id='personCreated2']").should("have.text","Nov 24, 2024");
        cy.get("span[id='personEdited2']").should("have.text","Nov 24, 2024");
        cy.get("span[id='eyeColor2']").should("have.text","brown");
        cy.get("span[id='gender2']").should("have.text","male");
        cy.get("span[id='hairColor2']").should("have.text","brown");
        cy.get("span[id='height2']").should("have.text","88");
        cy.get("span[id='skinColor2']").should("have.text","brown");
    })

    it('should play the game twice and check if score increments properly', () => {
        cy.visit('http://localhost:4200/')

        playTheGame()        
        cy.get("h3[id='score1']").should("have.text","1");
        cy.get("h3[id='score2']").should("have.text","0");

        playTheGame()
        cy.get("h3[id='score1']").should("have.text","2");
        cy.get("h3[id='score2']").should("have.text","0");        
    })

    it('should play the game twice, reset game and check if fields are cleared', () => {
        cy.visit('http://localhost:4200/')

        playTheGame()
        playTheGame()
        cy.get('button[data-test-id="resetButton"]').click()

        cy.get("h3[id='score1']").should("have.text","0");
        cy.get("h3[id='score2']").should("have.text","0");
        
        cy.get("span[id='personName1']").should("have.text","");
        cy.get("span[id='mass1']").should("have.text","");
        cy.get("span[id='birthYear1']").should("have.text","");
        cy.get("span[id='personCreated1']").should("have.text","");
        cy.get("span[id='personEdited1']").should("have.text","");
        cy.get("span[id='eyeColor1']").should("have.text","");
        cy.get("span[id='gender1']").should("have.text","");
        cy.get("span[id='hairColor1']").should("have.text","");
        cy.get("span[id='height1']").should("have.text","");
        cy.get("span[id='skinColor1']").should("have.text","");

        cy.get("span[id='personName2']").should("have.text","");
        cy.get("span[id='mass2']").should("have.text","");
        cy.get("span[id='birthYear2']").should("have.text","");
        cy.get("span[id='personCreated2']").should("have.text","");
        cy.get("span[id='personEdited2']").should("have.text","");
        cy.get("span[id='eyeColor2']").should("have.text","");
        cy.get("span[id='gender2']").should("have.text","");
        cy.get("span[id='hairColor2']").should("have.text","");
        cy.get("span[id='height2']").should("have.text","");
        cy.get("span[id='skinColor2']").should("have.text","");
    })
})