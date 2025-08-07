import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GithubLogin, { handleGithubLogin } from "../components/GithubLogin";
import callBackendAPI from "../components/GithubLogin";

// -- Unit Tests --

const OLD_LOCATION = window.location;

describe("GithubLogin", () => {
  beforeEach(() => {
    // Reset window.location
    delete (window as any).location;
    (window as any).location = { href: "" };
    // Clear URLSearchParams
    window.history.replaceState({}, "", "/");
    vi.restoreAllMocks();
  });

  it("renders login button", () => {
    render(<GithubLogin />);
    expect(screen.getByRole("button", { name: /login with github/i })).toBeInTheDocument();
  });

  it("redirects to GitHub OAuth when button is clicked", () => {
    render(<GithubLogin />);
    fireEvent.click(screen.getByRole("button", { name: /login with github/i }));
    expect(window.location.href).toMatch(
      /^https:\/\/github\.com\/login\/oauth\/authorize\?client_id=Iv23lim0mPy31j2pxNbg&scope=user:email/
    );
  });

  it("does not call backend if no code in URL", () => {
    const callBackendAPISpy = vi.spyOn(
      { callBackendAPI },
      "callBackendAPI"
    );
    render(<GithubLogin />);
    expect(callBackendAPISpy).not.toHaveBeenCalled();
  });

  it("calls backend if code is present in URL", () => {
    // Add ?code=1234 to the URL
    window.history.replaceState({}, "", "/?code=1234");
    const callBackendAPISpy = vi.spyOn(
      { callBackendAPI },
      "callBackendAPI"
    ).mockImplementation(() => Promise.resolve(null));
    render(<GithubLogin />);
    expect(callBackendAPISpy).toHaveBeenCalledWith(
      "GET",
      expect.stringContaining("code=1234")
    );
  });

  afterAll(() => {
    // Restore window.location properties
    Object.assign(window.location, OLD_LOCATION);
  });

  // -- Integration Tests --
  
  it("performs full OAuth flow: redirects and calls backend with code", () => {
    // Simulate user clicking login and then being redirected back with code
    render(<GithubLogin />);
    fireEvent.click(screen.getByRole("button", { name: /login with github/i }));
    // Simulate redirect with code in URL
    window.history.replaceState({}, "", "/?code=oauthcode");
    const callBackendAPISpy = vi.spyOn(
      { callBackendAPI },
      "callBackendAPI"
    ).mockImplementation(() => Promise.resolve(null));
    // Re-render to trigger useEffect with code in URL
    render(<GithubLogin />);
    expect(callBackendAPISpy).toHaveBeenCalledWith(
      "GET",
      expect.stringContaining("code=oauthcode")
    );
  });

  it("does not call backend if code param is empty string", () => {
    window.history.replaceState({}, "", "/?code=");
    const callBackendAPISpy = vi.spyOn(
      { callBackendAPI },
      "callBackendAPI"
    );
    render(<GithubLogin />);
    expect(callBackendAPISpy).not.toHaveBeenCalled();
  });
});

function afterAll(arg0: () => void) {
    throw new Error("Function not implemented.");
}
