/**
 * GitHub OAuth login handler and login button component.
 *
 * - handleGithubLogin: Redirects user to GitHub OAuth authorization page.
 * - callBackendAPI: Helper function to call backend API with specified HTTP method and URL, logs response or errors.
 * - GithubLogin component:
 *    - On mount, checks URL for OAuth code query parameter.
 *    - If code exists, calls backend to complete OAuth signup/login.
 *    - Renders a button that triggers GitHub OAuth login redirect on click.
 */

import React, { useEffect } from "react";

// GitHub OAuth config
const GITHUB_CLIENT_ID = "Iv23lim0mPy31j2pxNbg";
const BACKEND_URL = "https://githired-ntxa.onrender.com/";
const APP_ID = "1713987";

/**
 * Redirects user to GitHub OAuth login page.
 */
export const handleGithubLogin = () => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email`;
  window.location.href = redirectUri;
};

/**
 * Calls backend API with given HTTP method and URL, logs response or error.
 * @param {string} method - HTTP method (e.g., "GET", "POST").
 * @param {string} url - Full API endpoint URL to call.
 */
const callBackendAPI = async (method: string, url: string) => {
  try {
    const response = await fetch(url, { method });
    const data = await response.json();
    console.log("Backend response:", data);
  } catch (error) {
    console.error("Backend error:", error);
  }
};

/**
 * GithubLogin component renders a login button.
 * On mount, checks for GitHub OAuth code in URL and calls backend API to complete login.
 */
const GithubLogin: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    // Construct backend endpoint URL with OAuth code and app identifier
    const target = `${BACKEND_URL}/external-signup?app=${APP_ID}&code=${code}&provider=github`;
    callBackendAPI("GET", target);
  }, []);

  return <button onClick={handleGithubLogin}>Login with GitHub</button>;
};

export default GithubLogin;
