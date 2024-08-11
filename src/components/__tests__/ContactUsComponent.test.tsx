/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { ContactUsComponent } from "../ContactUsComponent/ContactUsComponent";

const mockOnSubmit = jest.fn();

describe("ContactUsComponent", () => {
  it("renders correctly", () => {
    render(<ContactUsComponent onSubmit={mockOnSubmit} />);

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Query Type")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(
      screen.getByText("I consent to being contacted by the team")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("updates form data on input change", () => {
    render(<ContactUsComponent onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByTestId("firstName-input"), {
      target: { value: "Artem" },
    });
    fireEvent.change(screen.getByTestId("lastName-input"), {
      target: { value: "Tyshchuk" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "XQpJQ@example.com" },
    });
    fireEvent.change(screen.getByTestId("message-input"), {
      target: { value: "Test message" },
    });

    fireEvent.click(screen.getByTestId("consent-checkbox"));

    expect(screen.getByTestId("firstName-input")).toHaveValue("Artem");
    expect(screen.getByTestId("lastName-input")).toHaveValue("Tyshchuk");
    expect(screen.getByTestId("email-input")).toHaveValue("XQpJQ@example.com");
    expect(screen.getByTestId("message-input")).toHaveValue("Test message");
    expect(screen.getByTestId("consent-checkbox")).toBeChecked();
  });

  it("shows error messages for invalid form submission", async () => {
    render(<ContactUsComponent onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("First Name is required")).toBeInTheDocument();
      expect(screen.getByText("Last Name is required")).toBeInTheDocument();
      expect(screen.getByText("Email Address is required")).toBeInTheDocument();
      expect(
        screen.getByText("Please select a query type")
      ).toBeInTheDocument();
      expect(screen.getByText("Message is required")).toBeInTheDocument();
      expect(
        screen.getByText(
          "To submit this form, please consent to being contacted"
        )
      ).toBeInTheDocument();
    });
  });

  it("submits form data and displays success notification", async () => {
    render(<ContactUsComponent onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByTestId("firstName-input"), {
      target: { value: "Artem" },
    });
    fireEvent.change(screen.getByTestId("lastName-input"), {
      target: { value: "Tyshchuk" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "XQpJQ@example.com" },
    });
    fireEvent.change(screen.getByTestId("message-input"), {
      target: { value: "Test message" },
    });
    fireEvent.click(screen.getByText(/General Enquiry/i));
    fireEvent.click(screen.getByTestId("consent-checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    const messageafter = await screen.findByTestId(/notification-success/);
    expect(messageafter).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(mockOnSubmit).toHaveBeenCalled();
    //   expect(screen.getByTestId("notification-success")).toBeInTheDocument();
    // });
  });
});
