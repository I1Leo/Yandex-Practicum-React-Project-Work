declare namespace Cypress {
  interface Chainable {
    createOrder(): Chainable;
    addTokens(): Chainable;
  }
}

const data_product: string = "[data-testid = 643d69a5c3f7b9001cfa0943]"

Cypress.Commands.add("createOrder", () => {
  cy.get("[data-testid = 643d69a5c3f7b9001cfa093d]").trigger("dragstart");
  cy.get('[data-testid = constructor-section]').as("constructor-section");
  cy.get('@constructor-section').trigger("drop");
  cy.get(data_product).trigger("dragstart");
  cy.get('@constructor-section').trigger("drop");
  cy.get(data_product).trigger("dragstart");
  cy.get('@constructor-section').trigger("drop");

  cy.get("[data-testid = order-btn]").click();
})

Cypress.Commands.add("addTokens", () => {
  window.localStorage.setItem(
    "refreshToken",
    JSON.stringify("test-refreshToken")
  );
  window.localStorage.setItem(
    "accessToken",
    JSON.stringify("test-accessToken")
  );
})