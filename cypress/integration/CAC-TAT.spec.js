/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('Verifica o título da aplicação', function() {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('Preenche os campos obrigatórios e envia formulário', function() {
      const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
      cy.get('#firstName').type(longText, {delay : 0})
      cy.get('#lastName').type('Ribeiro*-+@_')
      cy.get('#email').type('teste@teste.com')
      cy.get('#open-text-area').type(longText, {delay : 0})
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')
    })   

    it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function(){
      cy.get('#firstName').type('Phelipe')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('teste@teste.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com um valor não numérico', function(){
      cy.get('#phone')        
      .type('abcdefghij')
      .should('have.value', '')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
      cy.get('#firstName') 
      .type('Phelipe')      
      .should('have.value','Phelipe')     
      .clear().should('have.value', '')  
      cy.get('#lastName') 
      .type('Ribeiro')      
      .should('have.value','Ribeiro')     
      .clear().should('have.value', '') 
      cy.get('#phone') 
      .type('12345678')      
      .should('have.value','12345678')     
      .clear().should('have.value', '')
      cy.get('#email') 
      .type('teste@teste.com')      
      .should('have.value','teste@teste.com')     
      .clear().should('have.value', '') 
      cy.get('#open-text-area') 
      .type('teste')      
      .should('have.value','teste')     
      .clear().should('have.value', '') 
    })
    
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (Youtube) por seu texto - string', function(){
      cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor - value', function(){
      cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice - array', function(){
      cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
    })

    it('Seleciona uma caixa de seleção única (Feedback) por seu radio', function(){
      cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
    })
      
    it('Marca cada tipo de atendimento', function(){
      cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
      })
    })

    it('Marca ambos Checkboxes, e depois desmarca o', function(){
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
      // cy.get('#email-checkbox').should('be.checked') - CASO FOR PEGAR UM SELETOR ESPECÍFICO //
    })

    it('Garante que mensagem de erro seja apresentada - USANDO O CHECK', function(){
      cy.get('input[type="checkbox"][value="phone"]')
      .check()
      .should('be.checked')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })

    it('Preenche campos e Seleciona e envia um arquivo', function(){
      cy.get('#firstName').type('Phelipe')
      cy.get('#lastName').type('Ribeiro')
      cy.get('#email').type('teste@teste.com')
      cy.get('#open-text-area').type('teste')
      cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
      cy.contains('button', 'Enviar').click()  
      cy.get('.success').should('be.visible')
    })

    it('Seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
       })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json',{ action: 'drag-drop'})
      .should(function($input) {
       expect($input[0].files[0].name).to.equal('example.json')
       })
    })

    it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })
})

