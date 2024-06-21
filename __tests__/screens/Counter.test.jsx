// Counter.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Counter from "@/screens/Counter";

describe("Counter", () => {
    it("renders correctly showing initial count as 0", () => {
        const { getByText } = render(<Counter />);
        expect(getByText("Count: 0")).toBeTruthy();
    });

    it("increments count when button is pressed", () => {
        const { getByText } = render(<Counter />);
        const button = getByText("Increment");
        fireEvent.press(button);
        expect(getByText("Count: 1")).toBeTruthy();
    });
});
