import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Feature from ".";

describe("The Feature component", () => {
  it("should render properly", () => {
    render(<Feature img="test.png" imgAlt="" title="Hello world" text="blabla" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
