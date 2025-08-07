import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchResult } from "../components/SearchResult";

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
});