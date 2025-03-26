describe('Contacts App Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should successfully add a contact', () => {
    cy.get('input[placeholder="Ім\'я"]').type('Olena');
    cy.get('input[placeholder="Телефон"]').type('0987654321');
    cy.get('button').contains('Додати').click();

    cy.get('ul li').should('have.length', 1);
    cy.contains('Olena - 0987654321').should('exist');
  });

  it('should not add a contact with empty fields', () => {
    cy.get('button').contains('Додати').click();
    cy.get('ul li').should('have.length', 0);
  });

  it('should edit an existing contact', () => {
    cy.get('input[placeholder="Ім\'я"]').type('Petro');
    cy.get('input[placeholder="Телефон"]').type('0991122334');
    cy.get('button').contains('Додати').click();

    cy.contains('Petro - 0991122334').parent().within(() => {
      cy.get('button').contains('Редагувати').click();
    });

    cy.get('input[placeholder="Ім\'я"]').clear().type('Petro Ivanov');
    cy.get('input[placeholder="Телефон"]').clear().type('0994455667');
    cy.get('button').contains('Зберегти').click();

    cy.contains('Petro - 0991122334').should('not.exist');
    cy.contains('Petro Ivanov - 0994455667').should('exist');
  });

  it('should delete a contact', () => {
    cy.get('input[placeholder="Ім\'я"]').type('Anna');
    cy.get('input[placeholder="Телефон"]').type('0976543210');
    cy.get('button').contains('Додати').click();

    cy.contains('Anna - 0976543210').parent().within(() => {
      cy.get('button').contains('Видалити').click();
    });

    cy.contains('Anna - 0976543210').should('not.exist');
  });

  it('should sort contacts alphabetically', () => {
    cy.get('input[placeholder="Ім\'я"]').type('Dmytro');
    cy.get('input[placeholder="Телефон"]').type('0993344556');
    cy.get('button').contains('Додати').click();
    
    cy.get('input[placeholder="Ім\'я"]').type('Bohdan');
    cy.get('input[placeholder="Телефон"]').type('0992233445');
    cy.get('button').contains('Додати').click();

    cy.get('button').contains('Сортувати за іменем').click();

    cy.get('ul li').first().within(() => {
      cy.contains('Bohdan').should('exist');
    });

    cy.get('ul li').last().within(() => {
      cy.contains('Dmytro').should('exist');
    });
  });
});
