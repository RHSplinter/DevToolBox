import TypeOptions = Cypress.TypeOptions;
import "cypress-real-events";

describe("JSON Validator Page", () => {
  const options: Partial<TypeOptions> = {parseSpecialCharSequences: false};
  const inputObject: object = {
    name: "John Doe",
    age: 42,
    cart: [{item: "apple", price: 1.20}, {item: "banana", price: 0.80}]
  };

  it("should display formatted json output", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='json-output']").should("have.value", JSON.stringify(inputObject, null, 4));
  });

  it("should change the spacing of the json output when the spacing option is changed", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='spacing-select']").should("exist").click()
      .get("[data-testid='spacing-option-2']").click();
    cy.get("[data-testid='json-output']").should("have.value", JSON.stringify(inputObject, null, 2));
  });

  it("should display error message when invalid json is entered", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist").type("{");
    cy.get("[data-testid='json-output']")
      .invoke('val')
      .should('match', /Expected property name|end of data while reading object contents/);
    cy.get("[data-testid='input-textarea']").should("exist").type("\"name\":}", options);
    cy.get("[data-testid='json-output']")
          .invoke('val')
          .should("match", /Unexpected token|unexpected character/);
  });

  it("clear json output on clear button pressed", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='clear-btn']").should("exist").click();
    cy.get("[data-testid='json-output']").should("be.empty");
  });

  // Clipboard write/read is only available for Chromium-based browsers in Cypress tests.
  (Cypress.isBrowser('firefox') ? it.skip : it)("should copy json formatted output on copy button pressed", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='copy-btn']").should("exist").focus().realClick();
    cy.window().then((win: AUTWindow) => {
      win.navigator.clipboard.readText()
        .then((text: string) => expect(text).to.eq(JSON.stringify(inputObject, null, 4)));
    });
  });

  it("should show the filtered data if JSON path filter is given", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='filter-input']").should("exist").type("$.cart[0].item");
    cy.get("[data-testid='json-output']").should("have.value", JSON.stringify(["apple"], null, 4));
  });

  it("should show the original output if filter is removed", () => {
    cy.visit("/tools/json-validator");
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='filter-input']").should("exist").type("$.cart[*].item").clear();
    cy.get("[data-testid='json-output']").should("have.value", JSON.stringify(inputObject, null, 4));
  });

  // Clipboard write/read is only available for Chromium-based browsers in Cypress tests.
  (Cypress.isBrowser('firefox') ? it.skip : it)("should copy the filtered data if copy button is pressed while filter is given", () => {
    cy.visit("/tools/json-validator");
    cy.get("[data-testid='input-textarea']").should("exist")
      .type(JSON.stringify(inputObject), options);
    cy.get("[data-testid='filter-input']").should("exist").type("$.cart[0].item");
    cy.get("[data-testid='copy-btn']").should("exist").focus().realClick();
    cy.window().then((win: AUTWindow) => {
      win.navigator.clipboard.readText()
        .then((text: string) => expect(text).to.eq(JSON.stringify(["apple"], null, 4)));
    });
  });
});
