describe('default layout', () => {
  it('test input', () => {
    cy.visit('../examples/index.html')
    cy.get('.tell-input')

    cy.get('.tell-input__countries-button')
      .click()

    cy.get('.tell-input__input')
      .type('(201) 555-555')
      .should('have.value', '(201) 555-555')
  })
})
