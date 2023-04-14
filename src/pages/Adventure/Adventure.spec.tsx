import Adventure from "./Adventure";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Test Adventure component", () => {

    test("Rendering component", () => {
        render(<Adventure />);
        const getByTestId = screen.getByTestId("adventure-container");
        expect(getByTestId).toBeInTheDocument();
    })


});