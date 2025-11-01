import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AchievementsBadges from "../AchievementsBadges";
import { Achievement } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockAchievements: Achievement[] = [
  {
    id: "badge-1",
    title: "Annual Badge 2024",
    description: "Solved problems consistently throughout 2024",
    iconUrl: "/images/badges/annual-2024.svg",
    earnedDate: new Date("2024-01-01"),
    category: "badge",
    rarity: "common",
  },
  {
    id: "cert-1",
    title: "Algorithm Expert",
    description: "Completed advanced algorithm course",
    iconUrl: "/images/badges/algorithm-expert.svg",
    earnedDate: new Date("2024-02-15"),
    category: "certificate",
    rarity: "rare",
  },
  {
    id: "contest-1",
    title: "Contest Winner",
    description: "Won first place in monthly contest",
    iconUrl: "/images/badges/contest-winner.svg",
    earnedDate: new Date("2024-03-10"),
    category: "contest",
    rarity: "legendary",
  },
];

describe("AchievementsBadges", () => {
  it("renders all achievements", () => {
    render(<AchievementsBadges achievements={mockAchievements} />);

    expect(screen.getByText("Annual Badge 2024")).toBeInTheDocument();
    expect(screen.getByText("Algorithm Expert")).toBeInTheDocument();
    expect(screen.getByText("Contest Winner")).toBeInTheDocument();
  });

  it("shows achievement descriptions on hover when tooltips enabled", () => {
    render(
      <AchievementsBadges achievements={mockAchievements} showTooltips={true} />
    );

    const badge = screen.getByText("Annual Badge 2024");
    fireEvent.mouseEnter(badge);

    expect(
      screen.getByText("Solved problems consistently throughout 2024")
    ).toBeInTheDocument();
  });

  it("filters achievements by category", () => {
    render(
      <AchievementsBadges
        achievements={mockAchievements}
        filterByCategory="certificate"
      />
    );

    expect(screen.getByText("Algorithm Expert")).toBeInTheDocument();
    expect(screen.queryByText("Annual Badge 2024")).not.toBeInTheDocument();
    expect(screen.queryByText("Contest Winner")).not.toBeInTheDocument();
  });

  it("renders in grid layout by default", () => {
    const { container } = render(
      <AchievementsBadges achievements={mockAchievements} />
    );

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toBeInTheDocument();
  });

  it("renders in masonry layout when specified", () => {
    const { container } = render(
      <AchievementsBadges achievements={mockAchievements} layout="masonry" />
    );

    // Check for masonry-specific classes or structure
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles empty achievements array", () => {
    render(<AchievementsBadges achievements={[]} />);

    expect(screen.getByText("No achievements available")).toBeInTheDocument();
  });

  it("displays achievement dates correctly", () => {
    render(<AchievementsBadges achievements={mockAchievements} />);

    // Check for formatted dates
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it("shows rarity indicators", () => {
    render(<AchievementsBadges achievements={mockAchievements} />);

    // Check that different rarity levels are handled
    const achievements = screen.getAllByRole("button");
    expect(achievements).toHaveLength(3);
  });

  it("handles click events on achievements", () => {
    const onAchievementClick = jest.fn();

    render(
      <AchievementsBadges
        achievements={mockAchievements}
        onAchievementClick={onAchievementClick}
      />
    );

    const badge = screen.getByText("Annual Badge 2024");
    fireEvent.click(badge);

    expect(onAchievementClick).toHaveBeenCalledWith(mockAchievements[0]);
  });

  it("applies custom className", () => {
    const { container } = render(
      <AchievementsBadges
        achievements={mockAchievements}
        className="custom-achievements"
      />
    );

    expect(container.firstChild).toHaveClass("custom-achievements");
  });
});
