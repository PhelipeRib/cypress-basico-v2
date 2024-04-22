Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Phelipe')
    cy.get('#lastName').type('Ribeiro')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})

