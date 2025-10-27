import "cypress-real-events";

interface Timestamps {
  [key: string]: string;
}

describe("Time Converter Page", () => {
  const inputFormats: { [format: string]: RegExp } = {
    "epoch": /^\d{13}$/,
    "unix": /^\d{10}$/,
    "iso": /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
  };

  Object.keys(inputFormats).forEach((inputFormat: string) => {
    it(`should display the converted time values with time format: '${inputFormat}'`, () => {
      cy.fixture("timestamps.json").then((timestamps: Timestamps) => {
        cy.visit("/tools/time-converter");
        cy.get("[data-testid='input-format-select']").should("exist").click()
          .get(`[data-testid='option-${inputFormat}']`).click();
        const localDate: string = new Date(timestamps["iso"]).toLocaleString();

        cy.get("[data-testid='timestamp-input']").should("exist").type(timestamps[inputFormat] as string);
        cy.get("[data-testid='output-utc-timezone']").should("have.value", timestamps["utc"]);
        cy.get("[data-testid='output-local-timezone']").should("have.value", localDate);
        cy.get("[data-testid='output-iso-8601']").should("have.value", timestamps["iso"]);
        cy.get("[data-testid='output-unix-time']").should("have.value", timestamps["unix"]);
        cy.get("[data-testid='output-week-of-year']").should("have.value", timestamps["weekOfYear"]);
        cy.get("[data-testid='output-day-of-week']").should("have.value", timestamps["dayOfWeek"]);
        cy.get("[data-testid='other-formats-header']").should("exist");
        cy.get("[data-testid='output-yyyy-mm-dd']").should("have.value", timestamps["ymd1"]);
        cy.get("[data-testid='output-yyyy/mm/dd']").should("have.value", timestamps["ymd2"]);
        cy.get("[data-testid='output-mm-dd-yyyy']").should("have.value", timestamps["mdy1"]);
        cy.get("[data-testid='output-mm/dd/yyyy']").should("have.value", timestamps["mdy2"]);
      });
    });
  });

  Object.keys(inputFormats).forEach((inputFormat: string) => {
    it(`should set current time when 'Now' button is pressed with time format: '${inputFormat}'`, () => {
      cy.visit("/tools/time-converter");
      cy.get("[data-testid='input-format-select']").should("exist").click()
        .get(`[data-testid='option-${inputFormat}']`).click();
      cy.get("[data-testid='current-time-btn']").should("exist").click();
      cy.get("[data-testid='other-formats-header']").should("exist");
      cy.get("[data-testid='timestamp-input']").should("exist").then((element: JQuery) => {
        expect(element.val()).to.match(inputFormats[inputFormat]);
      });
    });
  });

  it("should clear the output when clear button is pressed", () => {
    cy.visit("/tools/time-converter");
    cy.get("[data-testid='other-formats-header']").should("not.exist");
    cy.get("[data-testid='timestamp-input']").should("exist").type("1234567890");
    cy.get("[data-testid='other-formats-header']").should("exist");
    cy.get("[data-testid='clear-btn']").should("exist").click();
    cy.get("[data-testid='output-utc-timezone']").should("be.empty");
    cy.get("[data-testid='other-formats-header']").should("not.exist");
  });

  it("should clear form when switching between input values", () => {
    cy.visit("/tools/time-converter");
    cy.get("[data-testid='timestamp-input']").should("exist").type("1234567890");
    cy.get("[data-testid='input-format-select']").should("exist").click()
      .get(`[data-testid='option-iso']`).click();
    cy.get("[data-testid='timestamp-input']").should("be.empty");
    cy.get("[data-testid='other-formats-header']").should("not.exist");
  });

  it("should display 'Invalid Date' if an invalid date is entered", () => {
    cy.visit("/tools/time-converter");
    cy.get("[data-testid='timestamp-input']").should("exist").type("abc");
    cy.get("[data-testid='output-utc-timezone']").should("have.value", "Invalid Date");
    cy.get("[data-testid='other-formats-header']").should("not.exist");
  });

  // Clipboard write/read is only available for Chromium-based browsers in Cypress tests.
  (Cypress.isBrowser('firefox') ? it.skip : it)("should copy value on copy button pressed", () => {
    cy.fixture("timestamps.json").then((timestamps: Timestamps) => {
      cy.visit("/tools/time-converter");
      cy.get("[data-testid='timestamp-input']").should("exist").type(timestamps["epoch"]);
      cy.get("[data-testid='output-utc-timezone']").should("exist")
        .get("[data-testid='copy-btn']").should("exist").realClick();
     cy.window().then((win: AUTWindow) => {
        win.navigator.clipboard.readText().then((text: string) => expect(text).to.eq(timestamps["utc"]));
      });
    });
  });
});
