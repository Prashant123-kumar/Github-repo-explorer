import React from "react";

function SearchBar({ username, setUsername, handleSearch, loading, recentSearches, onRecentClick }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      handleSearch();
    }
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-container">
        <input
          type="text"
          placeholder="Enter GitHub username (e.g., torvalds)..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !username.trim()}>
          {loading ? <span className="spinner"></span> : "Search Profile"}
        </button>
      </form>
      
      {recentSearches && recentSearches.length > 0 && (
        <div className="recent-searches">
          <span>Recently Searched:</span>
          <div className="tags">
            {recentSearches.map((search, index) => (
              <button 
                key={index} 
                className="tag-btn"
                onClick={() => onRecentClick(search)}
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;