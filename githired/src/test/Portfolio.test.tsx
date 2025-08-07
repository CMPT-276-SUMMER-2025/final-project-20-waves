import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import Portfolio from "../subpages/Portfolio";
import { MemoryRouter } from "react-router-dom";

// -- Unit Tests --

beforeEach(() => {
  Storage.prototype.getItem = vi.fn(() => null);
  Storage.prototype.setItem = vi.fn();
});

describe("Portfolio", () => {
  it("renders all profile input fields", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Birth/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Address/i)).toBeInTheDocument();
  });

  it("updates name input and saves to localStorage", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    const nameInput = screen.getByPlaceholderText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Alice" } });
    expect(nameInput).toHaveValue("Alice");
    expect(localStorage.setItem).toHaveBeenCalledWith("name", "Alice");
  });

  it("shows default profile image if none is set", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    const img = screen.getByAltText(/profile/i) as HTMLImageElement;
    expect(img.src).toMatch(/default-profile\.png$/);
  });

  it("renders all tab buttons", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Work experience/i)).toBeInTheDocument();
  });

  it("switches tab content when tab is clicked", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/Projects/i));
    expect(screen.getByText(/content here/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Skills summary/i));
    expect(screen.getByText(/content here/i)).toBeInTheDocument();
  });

  it("shows autocomplete input in Education tab", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    expect(
      screen.getByPlaceholderText(/start typing university/i)
    ).toBeInTheDocument();
  });

  // -- Integration Tests --

  it("fills out profile and navigates between tabs (integration)", async () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    // Fill out profile fields
    fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: "Bob" } });
    fireEvent.change(screen.getByPlaceholderText(/Birth/i), { target: { value: "2000-01-01" } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "bob@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/Address/i), { target: { value: "123 Main St" } });

    expect(screen.getByPlaceholderText(/Name/i)).toHaveValue("Bob");
    expect(screen.getByPlaceholderText(/Birth/i)).toHaveValue("2000-01-01");
    expect(screen.getByPlaceholderText(/Email/i)).toHaveValue("bob@example.com");
    expect(screen.getByPlaceholderText(/Address/i)).toHaveValue("123 Main St");

    // Switch to Projects tab and check content
    fireEvent.click(screen.getByText(/Projects/i));
    expect(screen.getByText(/content here/i)).toBeInTheDocument();

    // Switch to Skills summary tab and check content
    fireEvent.click(screen.getByText(/Skills summary/i));
    expect(screen.getByText(/content here/i)).toBeInTheDocument();

    // Switch to Education tab and check autocomplete
    fireEvent.click(screen.getByText(/Education/i));
    expect(screen.getByPlaceholderText(/start typing university/i)).toBeInTheDocument();
  });

  it("persists name to localStorage and retrieves it on reload (integration)", async () => {
    // Simulate localStorage having a saved name
    (Storage.prototype.getItem as any).mockImplementation((key: string) => {
      if (key === "name") return "Charlie";
      return null;
    });

    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Name/i)).toHaveValue("Charlie");
  });
});
