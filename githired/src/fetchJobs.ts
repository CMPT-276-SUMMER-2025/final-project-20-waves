/**
 * fetchJobs - Asynchronously fetches job listings from backend API based on search criteria.
 *
 * @param {string} keywords - Search keywords for job titles or descriptions.
 * @param {string} [location=""] - Optional location filter as a string.
 * @param {string} [salary] - Optional minimum salary filter as a string, converted to number.
 * @param {string} [radius] - Optional search radius (distance) filter as a string.
 *
 * @returns {Promise<any[]>} - Promise resolving to an array of job objects returned by the API.
 *
 * Throws an error if the HTTP response is not successful (status code outside 200-299).
 */
export async function fetchJobs(
  keywords: string,
  location: string = "",
  salary?: string,
  radius?: string
) {
  const url = `/api/jobs`;

  // Prepare request payload with mandatory keywords and location, optionally add salary and radius if provided
  const requestBody: any = {
    keywords,
    location,
  };

  if (salary) requestBody.salary = parseInt(salary);
  if (radius) requestBody.radius = radius;

  // POST request to the jobs API with JSON body
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // Throw error if response not ok
  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  // Parse JSON response data
  const data = await response.json();

  // Debug log of the received data
  console.log("fetchJobs response data:", data);

  // Return the jobs array or empty array if none found
  return data.jobs || [];
}
