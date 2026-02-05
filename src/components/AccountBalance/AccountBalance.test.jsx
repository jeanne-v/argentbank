import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import AccountBalance from ".";

describe("The AccountBalance component", () => {
  it("should render properly", () => {
    render(<AccountBalance title="Bank account" balance={12.3} />);
    expect(screen.getByText("Bank account")).toBeInTheDocument();
    expect(screen.getByTestId("account-balance").textContent).toBe("$12.30");
  });
});
