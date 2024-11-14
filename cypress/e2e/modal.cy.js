describe("Modal", () => {
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

   it("Should open modal with ingredient details", () => {
      cy.get("[data-testid = 643d69a5c3f7b9001cfa093c]").click();
      cy.get("[data-testid = modal] h2").contains("Детали ингредиента").should("exist");
   })

   it("Should close modal by close btn", () => {
      cy.get("[data-testid = 643d69a5c3f7b9001cfa093c ]").click();
      cy.get("[data-testid = close]").click();
      cy.get("[data-testid = modal]").should("not.exist");
   })

   it("Should close modal by esc", () => {
      cy.get("[data-testid = 643d69a5c3f7b9001cfa093c ]").click();
      cy.get("body").trigger("keydown", { key: "Escape" });
      cy.get("[data-testid = modal]").should("not.exist");
   })
})

