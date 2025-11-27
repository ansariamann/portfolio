import { render, screen, waitFor } from "@testing-library/react";
import { VisualAnchor } from "../VisualAnchor";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Image component
jest.mock("next/image", () => {
  return function MockImage({ src, alt, onLoad, onError, ...props }: any) {
    return (
      <img
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        data-testid="profile-image"
        {...props}
      />
    );
  };
});

// Mock image optimization utilities
jest.mock("@/lib/image-optimization", () => ({
  getOptimizedImageUrl: jest.fn((src) => src),
  generateBlurDataURL: jest.fn(() => "data:image/svg+xml;base64,test"),
  getBestImageFormat: jest.fn(() => Promise.resolve("webp")),
}));

describe("VisualAnchor", () => {
  const mockProps = {
    primaryImage: {
      src: "/images/profile-photo.jpg",
      alt: "Test User - Software Developer",
      width: 320,
      height: 427,
    },
    fallbackContent: {
      initials: "TU",
      backgroundColor: "#3B82F6",
      textColor: "#FFFFFF",
      name: "Test User",
      role: "Software Developer",
    },
  };

  it("renders the primary image with correct attributes", () => {
    render(<VisualAnchor {...mockProps} />);

    const image = screen.getByTestId("profile-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Test User - Software Developer");
  });

  it("displays loading placeholder with initials", async () => {
    render(<VisualAnchor {...mockProps} />);

    // The loading placeholder should be visible initially
    await waitFor(() => {
      expect(screen.getByText("TU")).toBeInTheDocument();
    });
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <VisualAnchor {...mockProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has proper responsive sizing classes", () => {
    const { container } = render(<VisualAnchor {...mockProps} />);

    const imageContainer = container.querySelector(".w-\\[280px\\]");
    expect(imageContainer).toBeInTheDocument();
  });
});
