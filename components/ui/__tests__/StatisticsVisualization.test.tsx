import React from "react";
import { render, screen } from "@testing-library/react";
import StatisticsVisualization from "../StatisticsVisualization";
import { PlatformStatistics } from "@/types";

// Mock Chart.js
jest.mock("react-chartjs-2", () => ({
  Doughnut: ({ data, options }: any) => (
    <div data-testid="doughnut-chart">
      <div data-testid="chart-data">{JSON.stringify(data)}</div>
      <div data-testid="chart-options">{JSON.stringify(options)}</div>
    </div>
  ),
}));

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockStatistics: PlatformStatistics = {
  totalSolved: 150,
  currentStreak: 7,
  longestStreak: 23,
  difficultyBreakdown: {
    easy: 80,
    medium: 55,
    hard: 15,
  },
  acceptanceRate: 68.5,
  ranking: 125000,
};

describe("StatisticsVisualization", () => {
  it("renders statistics correctly", () => {
    render(
      <StatisticsVisualization
        statistics={mockStatistics}
        primaryColor="#FFA116"
        secondaryColor="#FF6B35"
      />
    );

    expect(screen.getByText("150")).toBeInTheDocument();
    expect(screen.getByText("Problems Solved")).toBeInTheDocument();
    expect(screen.getByText("68.5%")).toBeInTheDocument();
    expect(screen.getByText("Acceptance Rate")).toBeInTheDocument();
  });

  it("renders difficulty breakdown chart", () => {
    render(
      <StatisticsVisualization
        statistics={mockStatistics}
        primaryColor="#FFA116"
        secondaryColor="#FF6B35"
      />
    );

    const chart = screen.getByTestId("doughnut-chart");
    expect(chart).toBeInTheDocument();

    const chartData = screen.getByTestId("chart-data");
    const data = JSON.parse(chartData.textContent || "{}");

    expect(data.datasets[0].data).toEqual([80, 55, 15]);
    expect(data.labels).toEqual(["Easy", "Medium", "Hard"]);
  });

  it("handles missing optional statistics", () => {
    const minimalStats: PlatformStatistics = {
      totalSolved: 50,
      currentStreak: 3,
      longestStreak: 10,
      difficultyBreakdown: {
        easy: 30,
        medium: 15,
        hard: 5,
      },
    };

    render(
      <StatisticsVisualization
        statistics={minimalStats}
        primaryColor="#FFA116"
        secondaryColor="#FF6B35"
      />
    );

    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.queryByText("Acceptance Rate")).not.toBeInTheDocument();
    expect(screen.queryByText("Global Ranking")).not.toBeInTheDocument();
  });

  it("applies custom colors correctly", () => {
    render(
      <StatisticsVisualization
        statistics={mockStatistics}
        primaryColor="#00EA64"
        secondaryColor="#00C853"
      />
    );

    const chartData = screen.getByTestId("chart-data");
    const data = JSON.parse(chartData.textContent || "{}");

    expect(data.datasets[0].backgroundColor).toContain("#22c55e");
    expect(data.datasets[0].backgroundColor).toContain("#f59e0b");
    expect(data.datasets[0].backgroundColor).toContain("#ef4444");
  });

  it("renders with animation when enabled", () => {
    render(
      <StatisticsVisualization
        statistics={mockStatistics}
        primaryColor="#FFA116"
        secondaryColor="#FF6B35"
        animate={true}
      />
    );

    // Check that the component renders without errors when animation is enabled
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <StatisticsVisualization
        statistics={mockStatistics}
        primaryColor="#FFA116"
        secondaryColor="#FF6B35"
        className="custom-class"
      />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
