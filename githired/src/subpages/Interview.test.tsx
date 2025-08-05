import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Interview from "./CoverLetterH";

// Mock PageWrapper to just render children
vi.mock("../PageWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock InterviewQuestions component
const InterviewQuestionsMock = vi.fn(() => <div data-testid="interview-questions">Questions</div>);
vi.mock("../components/InterviewQuestions", () => ({
  __esModule: true,
  default: InterviewQuestionsMock,
}));

describe("Interview", () => {
  beforeEach(() => {
    InterviewQuestionsMock.mockClear();
  });

  it("renders job info", () => {
    render(<Interview />);
    expect(screen.getByText(/Interview Questions Feature/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontend Developer @ Tech Corp/i)).toBeInTheDocument();
    expect(screen.getByText(/Develop user-facing features using React and TypeScript./i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /show interview questions/i })).toBeInTheDocument();
  });

  it("does not show InterviewQuestions by default", () => {
    render(<Interview />);
    expect(screen.queryByTestId("interview-questions")).not.toBeInTheDocument();
  });

  it("shows InterviewQuestions when button is clicked", () => {
    render(<Interview />);
    fireEvent.click(screen.getByRole("button", { name: /show interview questions/i }));
    expect(screen.getByTestId("interview-questions")).toBeInTheDocument();
    expect(InterviewQuestionsMock).toHaveBeenCalledWith(
      expect.objectContaining({
        job: expect.objectContaining({
          title: "Frontend Developer",
          company: "Tech Corp",
        }),
        onClose: expect.any(Function),
      }),
      {}
    );
  });
});

function beforeEach(arg0: () => void) {
    throw new Error("Function not implemented.");
}
