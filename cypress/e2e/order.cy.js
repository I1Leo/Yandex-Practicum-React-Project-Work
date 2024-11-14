describe("Order", () => {
   beforeEach(() => {
      cy.intercept("GET", "user", { fixture: "user.json" });
      cy.intercept("GET", "ingredients", { fixture: "ingredients.json" });
      cy.intercept("POST", "orders", { fixture: "orders.json" });

      window.localStorage.setItem(
         "refreshToken",
         JSON.stringify("test-refreshToken")
      );
      window.localStorage.setItem(
         "accessToken",
         JSON.stringify("test-accessToken")
      );

      cy.visit("http://localhost:8000/")
   })

   it("Should create an order", () => {
      cy.get("[data-testid = 643d69a5c3f7b9001cfa093d ]").trigger("dragstart");
      cy.get('[data-testid = constructor-section]').trigger("drop");
      cy.get("[data-testid = 643d69a5c3f7b9001cfa0943 ]").trigger("dragstart");
      cy.get('[data-testid = constructor-section]').trigger("drop");
      cy.get("[data-testid = 643d69a5c3f7b9001cfa0943 ]").trigger("dragstart");
      cy.get('[data-testid = constructor-section]').trigger("drop");
   
      cy.get("[data-testid = order-btn]").click();

      cy.get("[data-testid = order-number]").contains(59374).should('exist')
   })
})
