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
      onClick={() => alert(`You selected ${result.title} at ${result.company}`)}
    >
      <h3>{result.title}</h3>
      <p>{result.company}</p>
    </div>
  );
};
