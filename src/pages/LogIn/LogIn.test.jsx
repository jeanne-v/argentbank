import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWrapper } from "../../tests/utils";
import LogIn from ".";
import { Routes, Route } from "react-router";

describe("The LogIn component", async () => {
  it("should show error msg when trying to log in with wrong credentials", async () => {
    const user = userEvent.setup();
    renderWithWrapper(<LogIn />);
    await user.type(screen.getByText("Username"), "wrong-email");
    await user.type(screen.getByText("Password"), "wrong-password");
    await user.click(screen.getByTestId("signin-btn"));
    const errorMsg = await screen.findByText("Error : wrong credentials");
    expect(errorMsg).toBeInTheDocument();
  });
  it("should redirect to profile page after logging in with correct credentials", async () => {
    const user = userEvent.setup();
    const mockRoutesWrapper = (
      <Routes>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/profile" element={<h1>PROFILE PAGE</h1>}></Route>
      </Routes>
    );
    renderWithWrapper(mockRoutesWrapper, { route: "/login" });

    await user.type(screen.getByText("Username"), "test-email");
    await user.type(screen.getByText("Password"), "test-password");
    await user.click(screen.getByTestId("signin-btn"));
    const profilePageText = await screen.findByText("PROFILE PAGE");
    expect(profilePageText).toBeInTheDocument();
  });
});
