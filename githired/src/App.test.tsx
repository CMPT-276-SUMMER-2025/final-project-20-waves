import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock subpages
vi.mock("./subpages/Home", () => ({
  __esModule: true,
  default: () => <div>Home Page</div>,
}));
vi.mock("./subpages/JobSearch", () => ({
  __esModule: true,
  default: () => <div>Job Search Page</div>,
}));
vi.mock("./subpages/Portfolio", () => ({
  __esModule: true,
  default: () => <div>Portfolio Page</div>,
}));
vi.mock("./subpages/Interview", () => ({
  __esModule: true,
  default: () => <div>Interview Page</div>,
}));

describe("App routing", () => {
  it("renders Home page at root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  it("renders JobSearch page at /job-search", () => {
    render(
      <MemoryRouter initialEntries={["/job-search"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Job Search Page/i)).toBeInTheDocument();
  });

  it("renders Portfolio page at /portfolio", () => {
    render(
      <MemoryRouter initialEntries={["/portfolio"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Portfolio Page/i)).toBeInTheDocument();
  });

  it("renders Interview page at /interview", () => {
    render(
      <MemoryRouter initialEntries={["/interview"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Interview Page/i)).toBeInTheDocument();
  });

  it("renders NavBar links", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /JobSearch/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Interview/i })).toBeInTheDocument();
  });
});