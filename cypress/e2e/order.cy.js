describe("Order", () => {
   beforeEach(() => {
      cy.intercept("GET", "user", { fixture: "user.json" });
      cy.intercept("GET", "ingredients", { fixture: "ingredients.json" });
      cy.intercept("POST", "orders", { fixture: "orders.json" });

      cy.addTokens();

      cy.visit("/");
   })

   it("Should create an order", () => {
      cy.createOrder();

      cy.get("[data-testid = order-number]").contains(59374).should('exist')
   })
})
