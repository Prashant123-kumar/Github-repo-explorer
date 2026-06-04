import React, { useState } from "react";

function RepoCard({ repo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className={`repo-card ${isExpanded ? "expanded" : ""}`} 
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="repo-header">
        <h3 className="repo-name">
          <a href={repo.htmlUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            {repo.name}
          </a>
        </h3>
        <span className="star-badge">
          ⭐ {repo.stargazersCount ?? 0}
        </span>
      </div>
      
      <p className="repo-desc">
        {repo.description || "No description provided for this repository."}
      </p>
      
      <div className="repo-footer">
        {repo.language && (
          <span className="repo-lang">
            <span className="lang-dot"></span> {repo.language}
          </span>
        )}
        <span className="repo-date">Updated: {formatDate(repo.updatedAt)}</span>
      </div>

      {isExpanded && (
        <div className="repo-details-drawer animate-slide-down">
          <div className="drawer-grid">
            <div className="drawer-item">
              <strong>Fork Count:</strong> 🍴 {repo.forksCount ?? 0} forks
            </div>
            <div className="drawer-item">
              <strong>Open Issues Tracker:</strong> ⚠️ {repo.openIssuesCount ?? 0} active issues
            </div>
            <div className="drawer-item">
              <strong>Default Branch:</strong> 🌿 <code>{repo.defaultBranch || "main"}</code>
            </div>
            {repo.topics && repo.topics.length > 0 && (
              <div className="drawer-item full-width">
                <strong>Topics:</strong>
                <div className="topic-tags">
                  {repo.topics.map((topic, i) => (
                    <span key={i} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RepoCard;