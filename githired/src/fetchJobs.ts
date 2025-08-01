export async function fetchJobs(
  keywords: string,
  location: string = "",
  salary?: string,
  radius?: string
) {
  const url = `http://localhost:5000/api/jobs`;

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
    throw new Error(`Backend request failed: ${response.status}`);
  }

  const data = await response.json();

  console.log("fetchJobs response data:", data); // <-- add this line to debug

  return data.jobs || [];
}

