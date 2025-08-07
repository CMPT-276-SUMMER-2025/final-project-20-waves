/**
 * SearchResult component displays a job search result with title and company.
 * Props:
 *  - result: object containing
 *      - title: job title string
 *      - company: company name string
 *
 * Clicking the component triggers an alert showing the selected job info.
 */
type SearchResultProps = {
  result: {
    title: string;
    company: string;
  };
};

export const SearchResult = ({ result }: SearchResultProps) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`You selected ${result.title} at ${result.company}`)} // Show alert on click
    >
      <h3>{result.title}</h3>
      <p>{result.company}</p>
    </div>
  );
};
