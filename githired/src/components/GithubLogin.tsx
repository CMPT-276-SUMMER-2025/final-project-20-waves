import React, { useEffect, useState } from "react";

// Github Sign-in feature
const CLIENT_ID = "Iv23lim0mPy31j2pxNbg";
const REDIRECT_URI = "https://githired-ntxa.onrender.com/";
const BACKEND_URL = "https://githired-ntxa.onrender.com/";
const APP_ID = "1713987";

export const handleGithubLogin = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user`;
  window.location.href = githubAuthUrl;
};

const callBackendAPI = async (method: string, url: string) => {
  try {
    const response = await fetch(url, { method });
    const data = await response.json();
    console.log("Backend response:", data);
  } catch (error) {
    console.error("Backend error:", error);
  }
};

const GithubLogin: React.FC = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    const target = `${BACKEND_URL}/external-signup?app=${APP_ID}&code=${code}&provider=github`;
    callBackendAPI("GET", target);
  }, []);

  return <button onClick={handleGithubLogin}>Login with GitHub</button>;
};

export default GithubLogin;
