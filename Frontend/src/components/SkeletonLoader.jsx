import React from "react";

function SkeletonLoader() {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-profile">
        <div className="skeleton-avatar pulse"></div>
        <div className="skeleton-text pulse" style={{ width: "200px", height: "24px", margin: "15px auto" }}></div>
        <div className="skeleton-text pulse" style={{ width: "150px", height: "16px", margin: "0 auto" }}></div>
      </div>
      <div className="skeleton-grid">
        {[1, 2, 3].map((n) => (
          <div key={n} className="skeleton-card pulse">
            <div className="skeleton-text" style={{ width: "70%", height: "20px" }}></div>
            <div className="skeleton-text" style={{ width: "95%", height: "14px", marginTop: "15px" }}></div>
            <div className="skeleton-text" style={{ width: "40%", height: "12px", marginTop: "10px" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;