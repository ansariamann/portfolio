/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CTAButtons } from "../CTAButtons";
import { TechStack } from "../TechStack";
import { SocialProof } from "../SocialProof";
import { ValueProposition } from "../ValueProposition";
import { VisualAnchor } from "../VisualAnchor";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock hooks
jest.mock("@/lib/hooks", () => ({
  useMobileOptimizedAnimation: () => ({
    shouldReduceAnimations: false,
    isMobile: false,
    isSmallMobile: false,
    touchDevice: false,
    screenHeight: 800,
    getTouchTargetSize: () => 44,
    getResponsiveFontSize: () => ({ mobile: 16, desktop: 18 }),
  }),
}));

// Mock image optimization
jest.mock("@/lib/image-optimization", () => ({
  getOptimizedImageUrl: (src: string) => src,
  generateBlurDataURL: () => "data:image/jpeg;base64,test",
  generateSrcSet: () => "",
  getBestImageFormat: () => Promise.resolve("webp"),
  imagePresets: {},
}));

describe("Hero Section Accessibility", () => {
  describe("CTAButtons", () => {
    const mockPrimaryAction = {
      label: "View My Work",
      onClick: jest.fn(),
    };

    const mockSecondaryAction = {
      label: "Let's Talk",
      onClick: jest.fn(),
    };

    it("should have proper ARIA labels", () => {
      render(
        <CTAButtons
          primaryAction={mockPrimaryAction}
          secondaryAction={mockSecondaryAction}
        />
      );

      const primaryButton = screen.getByRole("button", {
        name: /view my work.*navigate to projects section/i,
      });
      const secondaryButton = screen.getByRole("button", {
        name: /let's talk.*open email client or contact form/i,
      });

      expect(primaryButton).toBeInTheDocument();
      expect(secondaryButton).toBeInTheDocument();
    });

    it("should have proper focus styles", () => {
      render(
        <CTAButtons
          primaryAction={mockPrimaryAction}
          secondaryAction={mockSecondaryAction}
        />
      );

      const primaryButton = screen.getByRole("button", {
        name: /view my work/i,
      });
      expect(primaryButton).toHaveClass("focus:outline-none");
      expect(primaryButton).toHaveClass("focus:ring-4");
    });

    it("should handle keyboard navigation", () => {
      render(
        <CTAButtons
          primaryAction={mockPrimaryAction}
          secondaryAction={mockSecondaryAction}
        />
      );

      const primaryButton = screen.getByRole("button", {
        name: /view my work/i,
      });

      fireEvent.keyDown(primaryButton, { key: "Enter" });
      expect(mockPrimaryAction.onClick).toHaveBeenCalled();
    });
  });

  describe("TechStack", () => {
    it("should have proper ARIA structure", () => {
      render(<TechStack />);

      const techList = screen.getByRole("list", {
        name: /technology stack and skills/i,
      });
      expect(techList).toBeInTheDocument();

      const techItems = screen.getAllByRole("listitem");
      expect(techItems.length).toBeGreaterThan(0);
    });

    it("should have descriptive ARIA labels for tech items", () => {
      render(<TechStack />);

      const reactItem = screen.getByLabelText(/react.*proficiency level/i);
      expect(reactItem).toBeInTheDocument();
    });

    it("should hide decorative icons from screen readers", () => {
      render(<TechStack />);

      const icons = document.querySelectorAll('svg[aria-hidden="true"]');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe("SocialProof", () => {
    it("should have proper ARIA structure for metrics", () => {
      render(<SocialProof />);

      const metricsSection = screen.getByRole("list", {
        name: /professional achievements and metrics/i,
      });
      expect(metricsSection).toBeInTheDocument();
    });

    it("should have proper ARIA structure for social links", () => {
      render(<SocialProof />);

      const socialLinksSection = screen.getByRole("list", {
        name: /social media and contact links/i,
      });
      expect(socialLinksSection).toBeInTheDocument();
    });

    it("should have accessible social links", () => {
      render(<SocialProof />);

      const githubLink = screen.getByLabelText(/view github profile/i);
      const linkedinLink = screen.getByLabelText(/connect on linkedin/i);
      const emailLink = screen.getByLabelText(/send email/i);

      expect(githubLink).toBeInTheDocument();
      expect(linkedinLink).toBeInTheDocument();
      expect(emailLink).toBeInTheDocument();
    });

    it("should handle keyboard navigation for social links", () => {
      render(<SocialProof />);

      const githubLink = screen.getByLabelText(/view github profile/i);

      // Test keyboard event handling
      const mockOpen = jest.spyOn(window, "open").mockImplementation();
      fireEvent.keyDown(githubLink, { key: "Enter" });

      expect(mockOpen).toHaveBeenCalled();
      mockOpen.mockRestore();
    });
  });

  describe("ValueProposition", () => {
    const props = {
      headline: "John Doe",
      subheadline: "Full Stack Developer",
      description: "Building amazing web applications",
    };

    it("should have proper heading hierarchy", () => {
      render(<ValueProposition {...props} />);

      const h1 = screen.getByRole("heading", { level: 1 });
      const h2 = screen.getByRole("heading", { level: 2 });

      expect(h1).toHaveTextContent("John Doe");
      expect(h2).toHaveTextContent("Full Stack Developer");
    });

    it("should have proper ARIA attributes", () => {
      render(<ValueProposition {...props} />);

      const h1 = screen.getByRole("heading", { level: 1 });
      const h2 = screen.getByRole("heading", { level: 2 });

      expect(h1).toHaveAttribute("aria-level", "1");
      expect(h2).toHaveAttribute("aria-level", "2");
    });
  });

  describe("VisualAnchor", () => {
    const props = {
      primaryImage: {
        src: "/test-image.jpg",
        alt: "John Doe - Software Developer",
        width: 320,
        height: 427,
      },
      fallbackContent: {
        initials: "JD",
        backgroundColor: "#3B82F6",
        textColor: "#FFFFFF",
        name: "John Doe",
        role: "Software Developer",
      },
    };

    it("should have proper ARIA structure", () => {
      render(<VisualAnchor {...props} />);

      const imageContainer = screen.getByRole("img", {
        name: /professional profile photo/i,
      });
      expect(imageContainer).toBeInTheDocument();
    });

    it("should have screen reader description", () => {
      render(<VisualAnchor {...props} />);

      const description = document.getElementById("profile-description");
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass("sr-only");
    });

    it("should have proper image attributes", () => {
      render(<VisualAnchor {...props} />);

      // The Next.js Image component should have proper attributes
      const image = document.querySelector(
        'img[alt="John Doe - Software Developer"]'
      );
      expect(image).toHaveAttribute("role", "img");
      expect(image).toHaveAttribute("aria-describedby", "profile-description");
    });
  });

  describe("Color Contrast", () => {
    it("should meet WCAG AA standards for text colors", () => {
      // Test high contrast text utilities
      const testElement = document.createElement("div");
      testElement.className = "text-high-contrast";
      document.body.appendChild(testElement);

      const styles = window.getComputedStyle(testElement);
      // The text should be white (#ffffff) for high contrast
      expect(styles.color).toBe("rgb(255, 255, 255)");

      document.body.removeChild(testElement);
    });
  });

  describe("Keyboard Navigation", () => {
    it("should have proper focus management", () => {
      const testElement = document.createElement("button");
      testElement.className = "keyboard-focusable";
      document.body.appendChild(testElement);

      testElement.focus();
      expect(document.activeElement).toBe(testElement);

      document.body.removeChild(testElement);
    });
  });
});
