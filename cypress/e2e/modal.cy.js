const data_modal = "[data-testid = modal]";
const data_ingredient = "[data-testid = 643d69a5c3f7b9001cfa093c]";

describe("Modal", () => {
   beforeEach(() => {
      cy.intercept("GET", "user", { fixture: "user.json" });
      cy.intercept("GET", "ingredients", { fixture: "ingredients.json" });
      cy.intercept("POST", "orders", { fixture: "orders.json" });

      cy.addTokens();

      cy.visit("/");
   })

   it("Should open modal with ingredient details", () => {
      cy.get(data_ingredient).click();
      cy.get(`${[data_modal]} h2`).contains("Детали ингредиента").should("exist");
   })

   it("Should close modal by close btn", () => {
      cy.get(data_ingredient).click();
      cy.get("[data-testid = close]").click();
      cy.get(data_modal).should("not.exist");
   })

   it("Should close modal by esc", () => {
      cy.get(data_ingredient).click();
      cy.get("body").trigger("keydown", { key: "Escape" });
      cy.get(data_modal).should("not.exist");
   })
})

