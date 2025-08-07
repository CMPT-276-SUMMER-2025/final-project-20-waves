import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom';
import JobCard from "../components/JobCard";

const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Corp",
  snippet: "<b>Great job!</b>&nbsp;Apply now.",
  link: "https://example.com/job/1"
};

describe("JobCard", () => {
  it("renders job title and company", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
  });

  it("cleans and displays the snippet", () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText("Great job! Apply now.")).toBeInTheDocument();
  });

  it("shows fallback text if snippet is missing", () => {
    const jobNoSnippet = { ...mockJob, snippet: undefined };
    render(<JobCard job={jobNoSnippet} />);
    expect(screen.getByText(/No description available/i)).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const onClick = vi.fn();
    render(<JobCard job={mockJob} onClick={onClick} />);
    fireEvent.click(screen.getByText(/Frontend Developer/i).closest(".single-card")!);
    expect(onClick).toHaveBeenCalled();
  });
});