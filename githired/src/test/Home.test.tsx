import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../subpages/Home";
import { MemoryRouter } from "react-router-dom";

// -- Unit Tests --

// Mock PageWrapper to just render children
vi.mock("../PageWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock handleGithubLogin to avoid side effects
vi.mock("../components/GithubLogin", () => ({
   __esModule: true,
  default: () => <button>Mock Github Login</button>,
  handleGithubLogin: vi.fn(),
}));

describe("Home", () => {
  it("renders background images", () => {
    render(
    <MemoryRouter>
        <Home />
    </MemoryRouter>);
    // There are 3 background images
    expect(screen.getAllByAltText(/background-/i)).toHaveLength(3);
  });

  it("renders the logo", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  it("renders login and signup buttons", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /sign up/i })).toBeInTheDocument();
  });

  it("renders the texture image", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/background texture/i)).toBeInTheDocument();
  });

  it("renders all card slides", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    // There are 3 cards in cardsData
    expect(screen.getByText(/Job Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Interview/i)).toBeInTheDocument();
  });

  it("renders card images", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/Job Search/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Interview/i)).toBeInTheDocument();
  });

  // -- Integration Tests --
  
  it("navigates to login page when login button is clicked", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const loginLink = screen.getByRole("link", { name: /login/i });
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("navigates to signup page when sign up button is clicked", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const signupLink = screen.getByRole("link", { name: /sign up/i });
    expect(signupLink).toHaveAttribute("href", "/signup");
  });

  it("renders and can click the Github login button", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const githubButton = screen.getByRole("button", { name: /github/i });
    expect(githubButton).toBeInTheDocument();
    fireEvent.click(githubButton);
    // No error means the button is clickable and present
  });
  
});