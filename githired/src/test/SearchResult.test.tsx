import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchResult } from "../components/SearchResult";

// -- Unit Tests --

const mockResult = {
  title: "Frontend Developer",
  company: "Tech Corp",
};

describe("SearchResult", () => {
  it("renders the job title and company", () => {
    render(<SearchResult result={mockResult} />);
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
  });

  it("alerts with correct message when clicked", () => {
    window.alert = vi.fn();
    render(<SearchResult result={mockResult} />);
    fireEvent.click(screen.getByText(/Frontend Developer/i));
    expect(window.alert).toHaveBeenCalledWith(
      "You selected Frontend Developer at Tech Corp"
    );
  });

  // -- Integration Tests --

  it("renders multiple SearchResult components and handles individual clicks", () => {
    window.alert = vi.fn();
    const results = [
      { title: "Frontend Developer", company: "Tech Corp" },
      { title: "Backend Developer", company: "Biz Inc" },
    ];
    render(
      <>
        {results.map((result, idx) => (
          <SearchResult key={idx} result={result} />
        ))}
      </>
    );
    // Both results are rendered
    expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();

    // Click the second result
    fireEvent.click(screen.getByText(/Backend Developer/i));
    expect(window.alert).toHaveBeenCalledWith(
      "You selected Backend Developer at Biz Inc"
    );
  });

  it("alerts with correct message even if company name changes", () => {
    window.alert = vi.fn();
    const dynamicResult = { title: "QA Engineer", company: "QualityWorks" };
    render(<SearchResult result={dynamicResult} />);
    fireEvent.click(screen.getByText(/QA Engineer/i));
    expect(window.alert).toHaveBeenCalledWith(
      "You selected QA Engineer at QualityWorks"
    );
  });
});