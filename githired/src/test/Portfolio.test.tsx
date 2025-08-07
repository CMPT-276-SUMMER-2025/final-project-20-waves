import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import Portfolio from "../subpages/Portfolio";
import { MemoryRouter } from "react-router-dom";

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
});
