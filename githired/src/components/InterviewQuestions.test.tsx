import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InterviewQuestions from "./InterviewQuestions";

const mockJob = {
  id: "1",
  title: "Frontend Developer",
  company: "Tech Corp",
  snippet: "Build cool stuff",
  link: "https://example.com/job/1"
};

describe("InterviewQuestions", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading and then renders questions", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ questions: ["Q1", "Q2"] }),
      })
    ) as any;

    render(<InterviewQuestions job={mockJob} onClose={vi.fn()} />);
    expect(screen.getByText(/Loading questions/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Q1")).toBeInTheDocument();
      expect(screen.getByText("Q2")).toBeInTheDocument();
    });
  });

  it("shows error if fetch fails", async () => {
    window.fetch = vi.fn(() => Promise.reject(new Error("fail"))) as any;

    render(<InterviewQuestions job={mockJob} onClose={vi.fn()} />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load interview questions/i)).toBeInTheDocument();
    });
  });

  it("shows error if response is not ok", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 502 })
    ) as any;

    render(<InterviewQuestions job={mockJob} onClose={vi.fn()} />);
    await waitFor(() => {
      expect(screen.getByText(/Failed to load interview questions/i)).toBeInTheDocument();
    });
  });

  it("calls onClose when overlay or close button is clicked", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ questions: ["Q1"] }),
      })
    ) as any;

    const onClose = vi.fn();
    render(<InterviewQuestions job={mockJob} onClose={onClose} />);
    // Wait for questions to render
    await waitFor(() => expect(screen.getByText("Q1")).toBeInTheDocument());

    // Click close button
    fireEvent.click(screen.getByRole("button", { name: /×/ }));
    expect(onClose).toHaveBeenCalledTimes(1);

    // Click overlay
    fireEvent.click(screen.getByRole("dialog") || screen.getByText(/Interview Questions for:/).parentElement!.parentElement!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("renders job title", () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ questions: [] }),
      })
    ) as any;

    render(<InterviewQuestions job={mockJob} onClose={vi.fn()} />);
    expect(screen.getByText(/Interview Questions for: Frontend Developer/i)).toBeInTheDocument();
  });
});