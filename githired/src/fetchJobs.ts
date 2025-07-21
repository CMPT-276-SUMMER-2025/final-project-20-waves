export async function fetchJobs(keywords: string, location: string = "") {
  const apiKey = import.meta.env.VITE_JOOBLE_API_KEY;
  const url = `https://jooble.org/api/${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keywords, location }),
  });

  if (!response.ok) {
    throw new Error(`Jooble API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.jobs || [];
}