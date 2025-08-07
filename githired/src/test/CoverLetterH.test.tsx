import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CoverLetterH from "../subpages/CoverLetterH";

// -- Unit Tests --
describe("CoverLetterH", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders all input fields and button", () => {
    render(<CoverLetterH />);
    expect(screen.getByText(/Cover Letter Helper/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Job Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Cover Letter/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Get Feedback/i })).toBeInTheDocument();
  });

  it("updates job description and cover letter inputs", () => {
    render(<CoverLetterH />);
    const jobDesc = screen.getByPlaceholderText(/Paste the job description here/i);
    const coverLetter = screen.getByPlaceholderText(/Paste your cover letter here/i);

    fireEvent.change(jobDesc, { target: { value: "Job details" } });
    fireEvent.change(coverLetter, { target: { value: "My cover letter" } });

    expect(jobDesc).toHaveValue("Job details");
    expect(coverLetter).toHaveValue("My cover letter");
  });

  it("shows loading state when submitting", async () => {
    window.fetch = vi.fn(() =>
      new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ feedback: "Great job!" }),
      }), 100))
    ) as any;

    render(<CoverLetterH />);
    fireEvent.change(screen.getByPlaceholderText(/Paste the job description here/i), {
      target: { value: "Job" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Paste your cover letter here/i), {
      target: { value: "Letter" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Get Feedback/i }));
    expect(screen.getByRole("button")).toHaveTextContent(/Analyzing/i);

    await waitFor(() => {
      expect(screen.getByText(/AI Feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/Great job!/i)).toBeInTheDocument();
    });
  });

  it("shows error feedback if API returns error", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Bad request" }),
      })
    ) as any;

    render(<CoverLetterH />);
    fireEvent.change(screen.getByPlaceholderText(/Paste the job description here/i), {
      target: { value: "Job" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Paste your cover letter here/i), {
      target: { value: "Letter" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Get Feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/❌ Failed to get feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/Bad request/i)).toBeInTheDocument();
    });
  });

  it("shows error feedback if fetch throws", async () => {
    window.fetch = vi.fn(() => Promise.reject(new Error("Network error"))) as any;

    render(<CoverLetterH />);
    fireEvent.change(screen.getByPlaceholderText(/Paste the job description here/i), {
      target: { value: "Job" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Paste your cover letter here/i), {
      target: { value: "Letter" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Get Feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/❌ An error occurred while contacting the server/i)).toBeInTheDocument();
    });
  });

  // -- Integration Tests --
  
   it("submits form and displays feedback in a real user flow", async () => {
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ feedback: "Personalized feedback for your letter." }),
      })
    ) as any;

    render(<CoverLetterH />);
    fireEvent.change(screen.getByLabelText(/Job Description/i), {
      target: { value: "React developer job" },
    });
    fireEvent.change(screen.getByLabelText(/Your Cover Letter/i), {
      target: { value: "Dear hiring manager..." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Get Feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/AI Feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/Personalized feedback for your letter./i)).toBeInTheDocument();
    });
  });

  it("handles user correcting input and resubmitting after an error", async () => {
    // First, simulate API error
    window.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Missing fields" }),
      })
    ) as any;

    render(<CoverLetterH />);
    fireEvent.change(screen.getByLabelText(/Job Description/i), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText(/Your Cover Letter/i), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Get Feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/❌ Failed to get feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/Missing fields/i)).toBeInTheDocument();
    });

    // Now, simulate user correcting input and successful fetch
    (window.fetch as any).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ feedback: "Looks good now!" }),
      })
    );

    fireEvent.change(screen.getByLabelText(/Job Description/i), {
      target: { value: "New job description" },
    });
    fireEvent.change(screen.getByLabelText(/Your Cover Letter/i), {
      target: { value: "Updated cover letter" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Get Feedback/i }));

    await waitFor(() => {
      expect(screen.getByText(/AI Feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/Looks good now!/i)).toBeInTheDocument();
    });
  });
});