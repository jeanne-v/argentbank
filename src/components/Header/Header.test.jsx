import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWrapper } from "../../tests/utils";
import Header from ".";
import { Routes, Route } from "react-router";

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
  it("should logout user after clicking on signout and redirect to homepage", async () => {
    const preloadedState = {
      auth: {
        isLoggedIn: true,
        userToken: "123",
      },
      user: {
        infos: {
          email: "jane.doe@email.com",
          firstName: "Jane",
          lastName: "Doe",
        },
      },
    };
    const user = userEvent.setup();
    const mockRoutesWrapper = (
      <>
        <Header />
        <Routes>
          <Route path="profile" element={<p>PROFILE PAGE</p>} />
          <Route path="/" element={<p>HOME PAGE</p>} />
        </Routes>
      </>
    );
    renderWithWrapper(mockRoutesWrapper, { route: "/profile", preloadedState });
    await user.click(screen.getByText("Sign Out"));
    const homepageText = await screen.findByText("HOME PAGE");
    expect(homepageText).toBeInTheDocument();
    expect(screen.queryByTestId("logged-link")).not.toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});
