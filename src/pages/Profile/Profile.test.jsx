import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithWrapper } from "../../tests/utils";
import Profile from ".";

describe("The Profile component", () => {
  it("should show edit name form after clicking on edit name btn", async () => {
    const preloadedState = {
      auth: {
        isLoggedIn: true,
        userToken: "123",
      },
      user: {
        infos: {
          email: "joeschmoe@email.com",
          firstName: "Joe",
          lastName: "Schmoe",
        },
      },
    };
    const user = userEvent.setup();
    renderWithWrapper(<Profile />, { preloadedState });
    await user.click(screen.getByRole("button", { name: "Edit Name" }));
    expect(screen.getByTestId("firstNameInput")).toBeInTheDocument();
    expect(screen.getByTestId("lastNameInput")).toBeInTheDocument();
  });

  it("should hide edit form after clicking on cancel btn", async () => {
    const preloadedState = {
      auth: {
        isLoggedIn: true,
        userToken: "123",
      },
      user: {
        infos: {
          email: "joeschmoe@email.com",
          firstName: "Joe",
          lastName: "Schmoe",
        },
      },
    };

    const user = userEvent.setup();
    renderWithWrapper(<Profile />, { preloadedState });
    await user.click(screen.getByRole("button", { name: "Edit Name" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByTestId("firstNameInput")).not.toBeInTheDocument();
    expect(screen.queryByTestId("lastNameInput")).not.toBeInTheDocument();
  });

  it("should update ui with new name after editing name", async () => {
    const preloadedState = {
      auth: {
        isLoggedIn: true,
        userToken: "mockToken",
      },
      user: {
        infos: {
          email: "joeschmoe@email.com",
          firstName: "Joe",
          lastName: "Schmoe",
        },
      },
    };

    const user = userEvent.setup();
    renderWithWrapper(<Profile />, { preloadedState });

    await user.click(screen.getByRole("button", { name: "Edit Name" }));
    await user.type(screen.getByTestId("firstNameInput"), "Harry");
    await user.type(screen.getByTestId("lastNameInput"), "Potter");
    await user.click(screen.getByRole("button", { name: "Save" }));
    const newUserMsg = await screen.findByText(/Harry Potter/);
    expect(newUserMsg).toBeInTheDocument();
  });
});
