/* eslint-disable testing-library/no-node-access */
import { screen, render } from "@testing-library/react";
import { Notification } from "../Notification/Notification";

describe("Notification", () => {
  beforeEach(() => {
    const container = document.createElement("div");
    container.setAttribute("id", "notification");
    document.body.appendChild(container);
  });

  afterEach(() => {
    const container = document.getElementById("notification");
    if (container) {
      document.body.removeChild(container);
    }
  });

  it("should render success notification correctly", () => {
    render(
      <Notification
        notification={{
          active: true,
          error: false,
          message: "Form submitted successfully",
        }}
      />
    );

    expect(screen.getByText("Form submitted successfully")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Thanks for completing the form. We’ll be in touch soon!"
      )
    ).toBeInTheDocument();
  });

  it("should render error notification correctly", () => {
    render(
      <Notification
        notification={{
          active: true,
          error: true,
          message: "Something went wrong",
        }}
      />
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Please try again later")).toBeInTheDocument();
  });
});
