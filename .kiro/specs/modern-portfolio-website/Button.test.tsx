import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button component", () => {
  test("renders button with text", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
