import Adventure from "./Adventure";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test Adventure component", () => {

    it("should render the component", () => {
        render(<Adventure />);
        expect(screen.getByTestId("adventure-container")).toBeInTheDocument();
    })

    it("should start with the InputGridLayout component shown", () => {
        render(<Adventure />);
        expect(screen.getByTestId("input-grid-layout")).toBeInTheDocument();
    })
    
    it("should display the InputGridMountains component after InputGridLayout is completed", () => {
        render(<Adventure />);
        const nbColumnsInput = screen.getByTestId("input-cols");
        const nbRowsInput = screen.getByTestId("input-rows");
        const submitButton = screen.getByTestId("input-grid-layout-submit");

        fireEvent.change(nbColumnsInput, { target: { value: "5" } });
        fireEvent.change(nbRowsInput, { target: { value: "5" } });
        fireEvent.click(submitButton);

        expect(screen.getByTestId("input-grid-mountains")).toBeInTheDocument();
    });

});