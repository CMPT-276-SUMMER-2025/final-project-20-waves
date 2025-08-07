import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import JobSearch from "../subpages/JobSearch";

// -- Unit Tests --

// Mock dependencies
vi.mock("../PageWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
vi.mock("../components/JobCard", () => ({
  __esModule: true,
  default: ({ job, onClick }: any) => (
    <div data-testid="job-card" onClick={onClick}>
      {job.title}
    </div>
  ),
}));
vi.mock("../components/JobInfo", () => ({
  __esModule: true,
  default: ({ job, onClose }: any) => (
    <div data-testid="job-info">
      {job.title}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

// Mock fetchJobs
const mockJobs = [
  { id: "1", title: "Frontend Dev" },
  { id: "2", title: "Backend Dev" },
];
const fetchJobsMock = vi.fn();
vi.mock("../fetchJobs", () => ({
  fetchJobs: fetchJobsMock,
}));

describe("JobSearch", () => {
  beforeEach(() => {
    fetchJobsMock.mockReset();
  });

  it("renders search bar inputs and search button", () => {
    render(<JobSearch />);
    expect(screen.getByPlaceholderText(/Keywords/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Minimum Salary/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("fetches and displays jobs on mount", async () => {
    fetchJobsMock.mockResolvedValueOnce(mockJobs);
    render(<JobSearch />);
    await waitFor(() => {
      expect(fetchJobsMock).toHaveBeenCalled();
      expect(screen.getAllByTestId("job-card")).toHaveLength(2);
    });
  });

  it("updates input fields when user types", () => {
    render(<JobSearch />);
    fireEvent.change(screen.getByPlaceholderText(/Keywords/i), {
      target: { value: "React" },
    });
    expect(screen.getByPlaceholderText(/Keywords/i)).toHaveValue("React");
    fireEvent.change(screen.getByPlaceholderText(/Location/i), {
      target: { value: "Vancouver" },
    });
    expect(screen.getByPlaceholderText(/Location/i)).toHaveValue("Vancouver");
    fireEvent.change(screen.getByPlaceholderText(/Minimum Salary/i), {
      target: { value: "100000" },
    });
    expect(screen.getByPlaceholderText(/Minimum Salary/i)).toHaveValue(100000);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "8" } });
    expect(screen.getByRole("combobox")).toHaveValue("8");
  });

  it("fetches and displays jobs when search is clicked", async () => {
    fetchJobsMock.mockResolvedValueOnce(mockJobs);
    render(<JobSearch />);
    fireEvent.change(screen.getByPlaceholderText(/Keywords/i), {
      target: { value: "React" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(fetchJobsMock).toHaveBeenCalledWith("React", "", "", "0");
      expect(screen.getAllByTestId("job-card")).toHaveLength(2);
    });
  });

  it("shows no jobs found message if search returns empty", async () => {
    fetchJobsMock.mockResolvedValueOnce([]);
    render(<JobSearch />);
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/No jobs found/i)).toBeInTheDocument();
    });
  });

  it("shows job info when a job card is clicked", async () => {
    fetchJobsMock.mockResolvedValueOnce(mockJobs);
    render(<JobSearch />);
    await waitFor(() =>
      expect(screen.getAllByTestId("job-card")).toHaveLength(2)
    );
    fireEvent.click(screen.getAllByTestId("job-card")[0]);
    expect(screen.getByTestId("job-info")).toBeInTheDocument();
    expect(screen.getByText(/Frontend Dev/i)).toBeInTheDocument();
  });

  it("closes job info when close button is clicked", async () => {
    fetchJobsMock.mockResolvedValueOnce(mockJobs);
    render(<JobSearch />);
    await waitFor(() =>
      expect(screen.getAllByTestId("job-card")).toHaveLength(2)
    );
    fireEvent.click(screen.getAllByTestId("job-card")[0]);
    expect(screen.getByTestId("job-info")).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Close/i));
    expect(screen.queryByTestId("job-info")).not.toBeInTheDocument();
  });

  // -- Integration Tests --

  it("performs a full search and job info flow", async () => {
    // 1. User loads the page, jobs are fetched
    fetchJobsMock.mockResolvedValueOnce(mockJobs);
    render(<JobSearch />);
    await waitFor(() => {
      expect(screen.getAllByTestId("job-card")).toHaveLength(2);
    });

    // 2. User types in search fields and submits
    fetchJobsMock.mockResolvedValueOnce([
      { id: "3", title: "Fullstack Dev" }
    ]);
    fireEvent.change(screen.getByPlaceholderText(/Keywords/i), { target: { value: "Fullstack" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/Fullstack Dev/i)).toBeInTheDocument();
    });

    // 3. User clicks a job card, job info modal appears
    fireEvent.click(screen.getByText(/Fullstack Dev/i));
    expect(screen.getByTestId("job-info")).toBeInTheDocument();
    expect(screen.getByText(/Fullstack Dev/i)).toBeInTheDocument();

    // 4. User closes the job info modal
    fireEvent.click(screen.getByText(/Close/i));
    expect(screen.queryByTestId("job-info")).not.toBeInTheDocument();
  });

  it("shows 'No jobs found' after searching with no results", async () => {
    fetchJobsMock.mockResolvedValueOnce([]);
    render(<JobSearch />);
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/No jobs found/i)).toBeInTheDocument();
    });
  });

  it("handles multiple searches and displays correct results each time", async () => {
    // First search
    fetchJobsMock.mockResolvedValueOnce([{ id: "1", title: "React Dev" }]);
    render(<JobSearch />);
    fireEvent.change(screen.getByPlaceholderText(/Keywords/i), { target: { value: "React" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/React Dev/i)).toBeInTheDocument();
    });

    // Second search
    fetchJobsMock.mockResolvedValueOnce([{ id: "2", title: "Node Dev" }]);
    fireEvent.change(screen.getByPlaceholderText(/Keywords/i), { target: { value: "Node" } });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    await waitFor(() => {
      expect(screen.getByText(/Node Dev/i)).toBeInTheDocument();
    });
  });
});
