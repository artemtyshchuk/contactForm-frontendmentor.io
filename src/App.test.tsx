import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App Component", () => {
  it("should render the Contact Us Component", () => {
    render(<App />);
    expect(screen.getByTestId("contact-us-form")).toBeInTheDocument();
  });
});
