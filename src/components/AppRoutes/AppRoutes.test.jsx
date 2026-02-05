import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithWrapper } from "../../tests/utils";
import AppRoutes from ".";

describe("Navigation tests suite", () => {
  it("should render home page on / route", () => {
    renderWithWrapper(<AppRoutes />, { route: "/" });
    expect(
      screen.getByText("Open a savings account with Argent Bank today!"),
    ).toBeInTheDocument();
  });

  it("should render login page on /login route", () => {
    renderWithWrapper(<AppRoutes />, { route: "/login" });
    expect(screen.getByTestId("signin-btn")).toBeInTheDocument();
  });

  it("should redirect to login page when trying to access /profile when not logged in", () => {
    renderWithWrapper(<AppRoutes />, { route: "/profile" });
    expect(screen.getByTestId("signin-btn")).toBeInTheDocument();
  });

  it("should render profile page on /profile route when logged in", () => {
    renderWithWrapper(<AppRoutes />, {
      route: "/profile",
      preloadedState: { auth: { isLoggedIn: true } },
    });
    expect(screen.getByTestId("welcome-user")).toBeInTheDocument();
  });
});
