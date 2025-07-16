import { SearchBar, SearchResults } from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar />
        <SearchResults />
      </div>
    </div>
  );
}

export default App;
