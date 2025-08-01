import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import JobInfo from "./JobInfo";

const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Corp",
  snippet: "<b>Great job!</b>&nbsp;Apply now.",
  link: "https://example.com/job/1"
};

describe("JobInfo", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ summary: "AI generated summary." }),
      })
    ) as any;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders job title and company", () => {
    render(<JobInfo job={mockJob} onClose={vi.fn()} />);
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
  });

  it("calls onClose when overlay or close button is clicked", () => {
    const onClose = vi.fn();
    render(<JobInfo job={mockJob} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /×/ }));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Overlay click
    fireEvent.click(screen.getByText(/Frontend Developer/i).closest(".jobinfo-overlay")!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("shows loading and then AI summary", async () => {
    render(<JobInfo job={mockJob} onClose={vi.fn()} />);
    expect(screen.getByText(/Loading AI summary/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/AI Summary:/i)).toBeInTheDocument());
    expect(screen.getByText(/AI generated summary/i)).toBeInTheDocument();
  });

  it("shows snippet if AI summary fails", async () => {
    ((globalThis as any).fetch as any).mockImplementationOnce(() =>
      Promise.reject(new Error("API error"))
    );
    render(<JobInfo job={mockJob} onClose={vi.fn()} />);
    await waitFor(() => expect(screen.getByText(/Failed to load AI summary/i)).toBeInTheDocument());
  });

  it("renders external job link", () => {
    render(<JobInfo job={mockJob} onClose={vi.fn()} />);
    const link = screen.getByRole("link", { name: /View Full Job Posting/i });
    expect(link).toHaveAttribute("href", mockJob.link);
    expect(link).toHaveAttribute("target", "_blank");
  });
});