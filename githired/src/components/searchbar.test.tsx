
import { vi, expect, beforeEach, describe, it } from "vitest";
var fetchJobsMock = vi.fn();
vi.mock("../fetchJobs", () => ({
  fetchJobs: fetchJobsMock,
}));

import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { SearchBar } from "./searchbar";

describe("SearchBar", () => {
  beforeEach(() => {
    fetchJobsMock.mockReset();
  });

  it("renders all input fields and the search button", () => {
    render(<SearchBar setResults={vi.fn()} />);
    expect(screen.getByPlaceholderText(/Keywords/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Minimum Salary/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("updates input fields when user types", () => {
    render(<SearchBar setResults={vi.fn()} />);
    const keywordsInput = screen.getByPlaceholderText(/Keywords/i);
    fireEvent.change(keywordsInput, { target: { value: "React" } });
    expect(keywordsInput).toHaveValue("React");

    const locationInput = screen.getByPlaceholderText(/Location/i);
    fireEvent.change(locationInput, { target: { value: "Vancouver" } });
    expect(locationInput).toHaveValue("Vancouver");

    const salaryInput = screen.getByPlaceholderText(/Minimum Salary/i);
    fireEvent.change(salaryInput, { target: { value: "100000" } });
    expect(salaryInput).toHaveValue(100000);
  });

  it("calls setResults with jobs on successful search", async () => {
    const mockJobs = [{ id: 1, title: "Test Job" }];
    fetchJobsMock.mockResolvedValueOnce(mockJobs);
    const setResults = vi.fn();

    render(<SearchBar setResults={setResults} />);
    fireEvent.change(screen.getByPlaceholderText(/Keywords/i), { target: { value: "React" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => expect(fetchJobsMock).toHaveBeenCalled());
    expect(setResults).toHaveBeenCalledWith(mockJobs);
  });

  it("calls setResults with [] on fetch error", async () => {
    fetchJobsMock.mockRejectedValueOnce(new Error("fail"));
    const setResults = vi.fn();

    render(<SearchBar setResults={setResults} />);
    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => expect(setResults).toHaveBeenCalledWith([]));
  });
});