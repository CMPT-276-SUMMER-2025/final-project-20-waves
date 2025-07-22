export async function fetchJobs(
  keywords: string,
  location: string = "",
  salary?: string,
  radius?: string
) {
  const apiKey = import.meta.env.VITE_JOOBLE_API_KEY;
  const url = `https://jooble.org/api/${apiKey}`;

  const requestBody: any = {
    keywords,
    location,
  };

  if (salary) requestBody.salary = parseInt(salary);
  if (radius) requestBody.radius = radius;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Jooble API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.jobs || [];
}
