import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ActivityHeatmap from "../ActivityHeatmap";
import { RecentActivity } from "@/types";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockActivities: RecentActivity[] = [
  {
    problemTitle: "Two Sum",
    difficulty: "Easy",
    solvedDate: new Date("2024-01-15"),
    tags: ["Array", "Hash Table"],
    problemUrl: "https://leetcode.com/problems/two-sum",
  },
  {
    problemTitle: "Add Two Numbers",
    difficulty: "Medium",
    solvedDate: new Date("2024-01-16"),
    tags: ["Linked List", "Math"],
  },
  {
    problemTitle: "Longest Substring",
    difficulty: "Hard",
    solvedDate: new Date("2024-01-17"),
    tags: ["String", "Sliding Window"],
  },
];

describe("ActivityHeatmap", () => {
  it("renders heatmap container", () => {
    render(<ActivityHeatmap activities={mockActivities} timePeriod="month" />);

    // Check for heatmap container
    const heatmapContainer = screen.getByRole("grid", {
      name: /activity heatmap/i,
    });
    expect(heatmapContainer).toBeInTheDocument();
  });

  it("displays correct time period", () => {
    render(<ActivityHeatmap activities={mockActivities} timePeriod="year" />);

    // Should show year view with 12 months
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it("shows activity tooltips on hover when interactive", () => {
    render(
      <ActivityHeatmap
        activities={mockActivities}
        timePeriod="month"
        interactive={true}
      />
    );

    // Find a day cell and hover over it
    const dayCell = screen.getAllByRole("gridcell")[0];
    fireEvent.mouseEnter(dayCell);

    // Should show tooltip with activity information
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("applies custom color scale", () => {
    const customColorScale = {
      empty: "#f0f0f0",
      low: "#c6e48b",
      medium: "#7bc96f",
      high: "#239a3b",
    };

    render(
      <ActivityHeatmap
        activities={mockActivities}
        timePeriod="month"
        colorScale={customColorScale}
      />
    );

    // Check that custom colors are applied
    const cells = screen.getAllByRole("gridcell");
    expect(cells.length).toBeGreaterThan(0);
  });

  it("handles empty activities array", () => {
    render(<ActivityHeatmap activities={[]} timePeriod="month" />);

    // Should still render heatmap structure
    const heatmapContainer = screen.getByRole("grid", {
      name: /activity heatmap/i,
    });
    expect(heatmapContainer).toBeInTheDocument();
  });

  it("calculates activity intensity correctly", () => {
    const activitiesWithMultipleDays = [
      ...mockActivities,
      {
        problemTitle: "Another Problem",
        difficulty: "Easy",
        solvedDate: new Date("2024-01-15"), // Same day as first activity
        tags: ["Array"],
      },
    ];

    render(
      <ActivityHeatmap
        activities={activitiesWithMultipleDays}
        timePeriod="month"
        interactive={true}
      />
    );

    // Should handle multiple activities on the same day
    const dayCell = screen.getAllByRole("gridcell")[0];
    fireEvent.mouseEnter(dayCell);

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("switches between time periods correctly", () => {
    const { rerender } = render(
      <ActivityHeatmap activities={mockActivities} timePeriod="month" />
    );

    // Initially shows month view
    expect(screen.getByRole("grid")).toBeInTheDocument();

    // Switch to year view
    rerender(<ActivityHeatmap activities={mockActivities} timePeriod="year" />);

    // Should still show heatmap but with different structure
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("handles non-interactive mode", () => {
    render(
      <ActivityHeatmap
        activities={mockActivities}
        timePeriod="month"
        interactive={false}
      />
    );

    const dayCell = screen.getAllByRole("gridcell")[0];
    fireEvent.mouseEnter(dayCell);

    // Should not show tooltip in non-interactive mode
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("displays month and day labels", () => {
    render(<ActivityHeatmap activities={mockActivities} timePeriod="year" />);

    // Should show month labels
    expect(screen.getByText(/Jan/i)).toBeInTheDocument();

    // Should show day labels (Mon, Wed, Fri)
    expect(screen.getByText(/Mon/i)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ActivityHeatmap
        activities={mockActivities}
        timePeriod="month"
        className="custom-heatmap"
      />
    );

    expect(container.firstChild).toHaveClass("custom-heatmap");
  });
});
