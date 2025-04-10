import React, { useState } from 'react';
import axios from 'axios';

function SearchComponent() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/search', { query });
            setResult(response.data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Ask anything..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>

            {result && (
                <div>
                    <h2>Summary</h2>
                    <p>{result.summary}</p>
                    <h3>Sources</h3>
                    <ul>
                        {result.sources.map((src, index) => (
                            <li key={index}>
                                <a href={src.link} target="_blank" rel="noopener noreferrer">
                                    {src.title}
                                </a>
                                <p>{src.snippet}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchComponent;
