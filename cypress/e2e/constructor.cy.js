const data_product_1 = "[data-testid = 643d69a5c3f7b9001cfa0942]";

describe("Constructor", () => {
   beforeEach(() => {
      cy.intercept("GET", "user", { fixture: "user.json" });
      cy.intercept("GET", "ingredients", { fixture: "ingredients.json" });

      cy.addTokens();

      cy.visit("/");
   })

   it("Should drag bun to the two bun sections", () => {
      cy.get("[data-testid = 643d69a5c3f7b9001cfa093c ]").trigger("dragstart");
      cy.get('[data-testid = constructor-section]').as("constructor-section");
      cy.get('@constructor-section').trigger("drop");
      cy.get('[data-testid = top-bun] span').contains("Краторная булка N-200i (вверх)").should("exist");
      cy.get('[data-testid = bottom-bun] span').contains("Краторная булка N-200i (низ)").should("exist");
   })

   it("Should drag ingredient to the constructor section", () => {
      cy.get(data_product_1).trigger("dragstart");
      cy.get('[data-testid = constructor-section]').as("constructor-section");
      cy.get('@constructor-section').trigger("drop");
      cy.get(data_product_1).trigger("dragstart");
      cy.get('@constructor-section').trigger("drop");
      cy.get("[data-testid = 643d69a5c3f7b9001cfa0941 ]").trigger("dragstart");
      cy.get('@constructor-section').trigger("drop");

      cy.get('@constructor-section').find("[data-testid = Ingredient-0]").should("exist");
      cy.get('@constructor-section').find("[data-testid = Ingredient-1]").should("exist");
      cy.get('@constructor-section').find("[data-testid = Ingredient-2]").should("exist");
   })

})
