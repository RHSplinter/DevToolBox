describe("Base64 Encoder Page", () => {
  it("should show the Base64 Encoder page", () => {
    cy.visit("/tools/base64-encoder");
    cy.get("app-text-area").should("exist");
    cy.get("app-readonly-text-area").should("exist");
  });

  it("should encode to Base64", () => {
    cy.fixture("base64-encoding.json").then(data => {
      data.forEach((item: { decodedValue: string, encodedValue: string }) => {
        cy.visit("/tools/base64-encoder");
        cy.get("[data-testid='input-textarea']").should("exist").type(item.decodedValue);
        cy.get("[data-testid='output-textarea']").should("have.value", item.encodedValue);
      });
    });
  });

  it("should decode from Base64", () => {
    cy.fixture("base64-encoding.json").then(data => {
      data.forEach((item: { decodedValue: string, encodedValue: string }) => {
        cy.visit("/tools/base64-encoder");
        cy.get("[data-testid='options-select']").should("exist").click()
          .get("[data-testid='option-decode']").click();
        cy.get("[data-testid='input-textarea']").should("exist").type(item.encodedValue);
        cy.get("[data-testid='output-textarea']").should("have.value", item.decodedValue);
      });
    });
  });

  it("should encode to Base64 URL", () => {
    cy.fixture("base64-encoding.json").then(data => {
      data.forEach((item: { decodedValue: string, urlEncodedValue: string }) => {
        cy.visit("/tools/base64-encoder");
        cy.get("[data-testid='options-select']").should("exist").click()
          .get("[data-testid='option-urlEncode']").click();
        cy.get("[data-testid='input-textarea']").should("exist").type(item.decodedValue);
        cy.get("[data-testid='output-textarea']").should("have.value", item.urlEncodedValue);
      });
    });
  });

  it("should decode from Base64 URL", () => {
    cy.fixture("base64-encoding.json").then(data => {
      data.forEach((item: { decodedValue: string, urlEncodedValue: string }) => {
        cy.visit("/tools/base64-encoder");
        cy.get("[data-testid='options-select']").should("exist").click()
          .get("[data-testid='option-urlDecode']").click();
        cy.get("[data-testid='input-textarea']").should("exist").type(item.urlEncodedValue);
        cy.get("[data-testid='output-textarea']").should("have.value", item.decodedValue);
      });
    });
  });

  it("should be able to copy output to clipboard", () => {
    cy.visit("/tools/base64-encoder");
    cy.get("[data-testid='input-textarea']").should("exist").type("Test");
    cy.get("[data-testid='copy-btn']").should("exist").click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text: string) => expect(text).to.eq('VGVzdA=='));
    });
  });

  it("should be able to clear input", () => {
    cy.visit("/tools/base64-encoder");
    cy.get("[data-testid='input-textarea']").should("exist").type("Test");
    cy.get("[data-testid='output-textarea']").should("have.value", "VGVzdA==");
    cy.get("[data-testid='clear-btn']").should("exist").click();
    cy.get("[data-testid='input-textarea']").should("be.empty");
    cy.get("[data-testid='output-textarea']").should("be.empty");
  });

  it("should show error message if failed to decode", () => {
    cy.visit("/tools/base64-encoder");
    cy.get("[data-testid='options-select']").should("exist").click()
      .get("[data-testid='option-decode']").click();
    cy.get("[data-testid='input-textarea']").should("exist").type("Value");
    cy.get("[data-testid='output-textarea']").should("have.value", "Invalid input: Unable to decode text");
  });
});
