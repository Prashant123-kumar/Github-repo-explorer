import React, { useState, useEffect } from "react";
import githubApi from "../api/githubApi";
import SearchBar from "../components/SearchBar";
import RepoCard from "../components/RepoCard";
import SkeletonLoader from "../components/SkeletonLoader";

function Home() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("stars"); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("recent_github_searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveToRecent = (name) => {
    const cleanName = name.trim().toLowerCase();
    if (!cleanName) return;
    let updated = [cleanName, ...recentSearches.filter((s) => s !== cleanName)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent_github_searches", JSON.stringify(updated));
  };

  // Main search driver matching your Spring Boot setup
  const executeSearch = async (targetUser, targetPage, isInitialSearch) => {
    if (!targetUser.trim()) return;

    // --- Input Sanitization Logic ---
    let cleanUsername = targetUser.trim();
    // If the user accidentally pastes a full profile URL, strip it down to the raw username
    if (cleanUsername.includes("github.com/")) {
      cleanUsername = cleanUsername.split("github.com/").pop().split(/[?#]/)[0];
    }
    // Remove any accidental leading or trailing slashes
    cleanUsername = cleanUsername.replace(/^\/+|\/+$/g, ""); 
    
    if (!cleanUsername) {
      setError("Please enter a valid GitHub username or profile URL.");
      return;
    }

    if (isInitialSearch) {
      setLoading(true);
      setError("");
      setProfile(null);
      setRepositories([]);
    } else {
      setLoadingMore(true);
    }

    try {
      // 1. Fetch user from GET /api/github/{username} using cleanUsername
      let currentProfile = profile;
      if (isInitialSearch) {
        const profileRes = await githubApi.get(`/${cleanUsername}`);
        currentProfile = profileRes.data;
        setProfile(currentProfile);
        saveToRecent(cleanUsername); // Save the sanitized version to history
      }

      // 2. Fetch paginated repos from GET /api/github/{username}/repos
      const reposRes = await githubApi.get(`/${cleanUsername}/repos`, {
        params: {
          sort: sortBy,
          page: targetPage,
          size: 10
        }
      });

      // Maps perfectly to your custom backend PagedResponse.java structure
      const pagedData = reposRes.data.data || []; 
      const nextIndicator = reposRes.data.hasNext;

      if (isInitialSearch) {
        setRepositories(pagedData);
      } else {
        setRepositories((prev) => [...prev, ...pagedData]);
      }
      
      setHasMore(nextIndicator);
      setPage(targetPage);

    } catch (err) {
      console.error("API Gateway error:", err);
      const backendMessage = err.response?.data?.message || "Failed communication with backend components.";
      setError(backendMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleInitialSearch = () => {
    executeSearch(username, 1, true);
  };

  // Re-fetch automatically if user changes the sorting dropdown view configuration
  useEffect(() => {
    if (profile) {
      executeSearch(username, 1, true);
    }
  }, [sortBy]);

  const handleLoadMore = () => {
    executeSearch(username, page + 1, false);
  };

  const triggerTagSearch = (selectedName) => {
    setUsername(selectedName);
    executeSearch(selectedName, 1, true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GitHub Repo Explorer</h1>
        <p className="subtitle">Enterprise Proxy Optimization powered by Caffeine Core Engine and Spring Boot.</p>
      </header>

      <SearchBar
        username={username}
        setUsername={setUsername}
        handleSearch={handleInitialSearch}
        loading={loading}
        recentSearches={recentSearches}
        onRecentClick={triggerTagSearch}
      />

      {error && (
        <div className="error-banner">
          <span className="err-icon">⚠️</span> {error}
        </div>
      )}

      {loading && <SkeletonLoader />}

      {profile && !loading && (
        <div className="dashboard-layout">
          
          {/* Profile Details Sidebar Section */}
          <aside className="profile-sidebar">
            <div className="profile-card">
              <img src={profile.avatarUrl || profile.avatar_url} alt={profile.name} className="avatar-img" />
              <h2 className="user-fullname">{profile.name || profile.login}</h2>
              <p className="user-login">@{profile.login}</p>
              {profile.bio && <p className="user-bio">“{profile.bio}”</p>}
              
              <div className="stats-matrix">
                <div className="stat-node">
                  <span className="stat-count">{profile.followers}</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-node">
                  <span className="stat-count">{profile.following}</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-node">
                  <span className="stat-count">{profile.publicRepos || profile.public_repos}</span>
                  <span className="stat-label">Public Repos</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Repositories Feed Collection Section */}
          <main className="repos-feed">
            <div className="feed-controls-header">
              <h3>Repositories Feed ({repositories.length})</h3>
              <div className="sort-filter-wrapper">
                <label htmlFor="sortSelect">Sort By: </label>
                <select 
                  id="sortSelect" 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="modern-dropdown"
                >
                  <option value="stars">✨ Stars</option>
                  <option value="name">🔤 Name</option>
                  <option value="updated">⏰ Updated</option>
                  <option value="forks">🍴 Forks</option>
                </select>
              </div>
            </div>

            {repositories.length === 0 ? (
              <div className="empty-state">
                <p>No public repositories found for this account layout window.</p>
              </div>
            ) : (
              <div className="repos-grid">
                {repositories.map((repo, idx) => (
                  <RepoCard key={`${repo.name}-${idx}`} repo={repo} />
                ))}
              </div>
            )}

            {/* Pagination Load Handling */}
            {hasMore && (
              <div className="pagination-box">
                <button 
                  onClick={handleLoadMore} 
                  disabled={loadingMore}
                  className="load-more-btn"
                >
                  {loadingMore ? "Streaming cached list..." : "Load More Repositories"}
                </button>
              </div>
            )}
          </main>

        </div>
      )}
    </div>
  );
}

export default Home;