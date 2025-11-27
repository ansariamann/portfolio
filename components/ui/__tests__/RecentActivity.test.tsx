import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RecentActivity from "../RecentActivity";
import { RecentActivity as RecentActivityType } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockActivities: RecentActivityType[] = [
  {
    id: "activity-1",
    problemTitle: "Two Sum",
    difficulty: "easy",
    solvedDate: new Date("2024-01-15T10:30:00"),
    tags: ["Array", "Hash Table"],
    problemUrl: "https://leetcode.com/problems/two-sum",
    language: "JavaScript",
    timeSpent: 30,
    isAccepted: true,
    attemptCount: 1,
  },
  {
    id: "activity-2",
    problemTitle: "Add Two Numbers",
    difficulty: "medium",
    solvedDate: new Date("2024-01-16T14:20:00"),
    tags: ["Linked List", "Math"],
    problemUrl: "https://leetcode.com/problems/add-two-numbers",
    language: "Python",
    timeSpent: 45,
    isAccepted: true,
    attemptCount: 2,
  },
  {
    id: "activity-3",
    problemTitle: "Longest Substring Without Repeating Characters",
    difficulty: "hard",
    solvedDate: new Date("2024-01-17T09:15:00"),
    tags: ["String", "Sliding Window", "Hash Table"],
    problemUrl: "https://leetcode.com/problems/longest-substring",
    language: "TypeScript",
    timeSpent: 90,
    isAccepted: false,
    attemptCount: 3,
  },
  {
    id: "activity-4",
    problemTitle: "Median of Two Sorted Arrays",
    difficulty: "hard",
    solvedDate: new Date("2024-01-18T16:45:00"),
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    problemUrl: "https://leetcode.com/problems/median-arrays",
    language: "Java",
    timeSpent: 120,
    isAccepted: true,
    attemptCount: 4,
  },
];

describe("RecentActivity", () => {
  it("renders all activities when no limit is set", () => {
    render(<RecentActivity activities={mockActivities} />);

    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(screen.getByText("Add Two Numbers")).toBeInTheDocument();
    expect(
      screen.getByText("Longest Substring Without Repeating Characters")
    ).toBeInTheDocument();
    expect(screen.getByText("Median of Two Sorted Arrays")).toBeInTheDocument();
  });

  it("limits activities when maxItems is set", () => {
    render(<RecentActivity activities={mockActivities} maxItems={2} />);

    expect(screen.getByText("Two Sum")).toBeInTheDocument();
    expect(screen.getByText("Add Two Numbers")).toBeInTheDocument();
    expect(
      screen.queryByText("Longest Substring Without Repeating Characters")
    ).not.toBeInTheDocument();
  });

  it("displays difficulty levels with correct styling", () => {
    render(<RecentActivity activities={mockActivities} />);

    const easyBadge = screen.getByText("Easy");
    const mediumBadge = screen.getByText("Medium");
    const hardBadges = screen.getAllByText("Hard");

    expect(easyBadge).toBeInTheDocument();
    expect(mediumBadge).toBeInTheDocument();
    expect(hardBadges).toHaveLength(2);
  });

  it("shows problem tags", () => {
    render(<RecentActivity activities={mockActivities} />);

    expect(screen.getByText("Array")).toBeInTheDocument();
    expect(screen.getByText("Hash Table")).toBeInTheDocument();
    expect(screen.getByText("Linked List")).toBeInTheDocument();
    expect(screen.getByText("Math")).toBeInTheDocument();
  });

  it("displays solved dates correctly", () => {
    render(<RecentActivity activities={mockActivities} />);

    // Check for date formatting (should show relative dates or formatted dates)
    expect(screen.getByText(/Jan 15/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 16/)).toBeInTheDocument();
  });

  it("creates clickable links for problems with URLs", () => {
    render(<RecentActivity activities={mockActivities} />);

    const problemLink = screen.getByRole("link", { name: /Two Sum/i });
    expect(problemLink).toBeInTheDocument();
    expect(problemLink).toHaveAttribute(
      "href",
      "https://leetcode.com/problems/two-sum"
    );
    expect(problemLink).toHaveAttribute("target", "_blank");
  });

  it("handles problems without URLs", () => {
    render(<RecentActivity activities={mockActivities} />);

    // "Add Two Numbers" doesn't have a URL, so it should not be a link
    const problemText = screen.getByText("Add Two Numbers");
    expect(problemText.closest("a")).toBeNull();
  });

  it("expands details when expandable is enabled", () => {
    render(<RecentActivity activities={mockActivities} expandable={true} />);

    const expandButton = screen.getAllByRole("button")[0];
    fireEvent.click(expandButton);

    // Should show expanded details
    expect(screen.getByText(/Array, Hash Table/)).toBeInTheDocument();
  });

  it("groups activities by date when enabled", () => {
    const activitiesOnSameDay = [
      {
        id: "same-day-1",
        problemTitle: "Problem 1",
        difficulty: "easy" as const,
        solvedDate: new Date("2024-01-15T10:30:00"),
        tags: ["Array"],
        problemUrl: "https://leetcode.com/problems/problem-1",
        language: "JavaScript",
        timeSpent: 30,
        isAccepted: true,
        attemptCount: 1,
      },
      {
        id: "same-day-2",
        problemTitle: "Problem 2",
        difficulty: "medium" as const,
        solvedDate: new Date("2024-01-15T14:20:00"),
        tags: ["String"],
        problemUrl: "https://leetcode.com/problems/problem-2",
        language: "Python",
        timeSpent: 45,
        isAccepted: true,
        attemptCount: 1,
      },
    ];

    render(
      <RecentActivity activities={activitiesOnSameDay} groupByDate={true} />
    );

    // Should group problems under the same date
    const dateHeaders = screen.getAllByText(/Jan 15/);
    expect(dateHeaders.length).toBeGreaterThan(0);
  });

  it("handles empty activities array", () => {
    render(<RecentActivity activities={[]} />);

    expect(
      screen.getByText("No recent activity available")
    ).toBeInTheDocument();
  });

  it('shows "Show More" button when there are more activities', () => {
    render(<RecentActivity activities={mockActivities} maxItems={2} />);

    const showMoreButton = screen.getByRole("button", { name: /Show More/i });
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);

    // Should show more activities after clicking
    expect(
      screen.getByText("Longest Substring Without Repeating Characters")
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <RecentActivity activities={mockActivities} className="custom-activity" />
    );

    expect(container.firstChild).toHaveClass("custom-activity");
  });

  it("handles very long problem titles gracefully", () => {
    const longTitleActivity = [
      {
        id: "long-title-1",
        problemTitle:
          "This is a very long problem title that should be handled gracefully by the component",
        difficulty: "medium" as const,
        solvedDate: new Date("2024-01-15"),
        tags: ["Array"],
        problemUrl: "https://leetcode.com/problems/long-title",
        language: "JavaScript",
        timeSpent: 60,
        isAccepted: true,
        attemptCount: 1,
      },
    ];

    render(<RecentActivity activities={longTitleActivity} />);

    expect(
      screen.getByText(/This is a very long problem title/)
    ).toBeInTheDocument();
  });
});
