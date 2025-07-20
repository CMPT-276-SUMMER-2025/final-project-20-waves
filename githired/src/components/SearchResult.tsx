export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`You selected ${result.title} at ${result.company}`)}
    >
      <h3>{result.title}</h3>
      <p>{result.company}</p>
    </div>
  );
};
