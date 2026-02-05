import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithWrapper } from "../../tests/utils";
import Header from ".";

describe("The Header component", () => {
  it("should render properly with signin button when not logged in", () => {
    renderWithWrapper(<Header />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
  it("should render properly with user name and signout button when logged in", () => {
    const preloadedState = {
      auth: {
        isLoggedIn: true,
      },
      user: {
        infos: {
          firstName: "Jane",
          lastName: "Doe",
          email: "jane.doe@email.com",
        },
      },
    };
    renderWithWrapper(<Header />, { preloadedState });
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });
});
