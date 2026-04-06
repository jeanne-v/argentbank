import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "../../tests/utils";

describe("Routes tests suite", () => {
  it("should render home page on / route", () => {
    renderApp({ route: "/" });
    expect(
      screen.getByText("Open a savings account with Argent Bank today!"),
    ).toBeInTheDocument();
  });

  it("should render login page on /login route", () => {
    renderApp({ route: "/login" });
    expect(screen.getByTestId("signin-btn")).toBeInTheDocument();
  });

  it("should redirect to login page when trying to access /profile when not logged in", () => {
    renderApp({ route: "/profile" });
    expect(screen.getByTestId("signin-btn")).toBeInTheDocument();
  });

  it("should render profile page on /profile route when logged in", () => {
    renderApp({
      route: "/profile",
      preloadedState: { auth: { isLoggedIn: true } },
    });
    expect(screen.getByTestId("welcome-user")).toBeInTheDocument();
  });
});

describe("Integration test", () => {
  it("should display user info on profile page after logging in", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByText("Sign In"));
    await user.type(screen.getByText("Username"), "test-email");
    await user.type(screen.getByText("Password"), "test-password");
    await user.click(screen.getByTestId("signin-btn"));
    const userMsg = await screen.findByText(/Joe Schmoe/i);
    expect(userMsg).toBeInTheDocument();
  });
});
