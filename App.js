import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await axios.post("http://localhost:5000/api/search", { query });
      setResults(response.data.results);
    } catch (err) {
      setError("Failed to fetch results. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Serplexity AI</h2>
        <ul className="nav">
          <li>🏠 Home</li>
          <li>🔍 Discover</li>
          <li>📚 Library</li>
          <li>⚙️ Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1 className="heading">What do you want to know?</h1>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Ask anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            {loading ? <AiOutlineLoading3Quarters className="loading" /> : <FaSearch />}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="error">{error}</p>}

        {/* Search Results */}
        <div className="results">
          {results.map((result, index) => (
            <div key={index} className="result-card">
              <h3>{result.title}</h3>
              <p>{result.snippet}</p>
              <a href={result.link} target="_blank" rel="noopener noreferrer">
                Visit <FiExternalLink />
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
