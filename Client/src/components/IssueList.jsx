import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import IssueCard from "./IssueCard"; // New component

const IssueList = ({ volume }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_CVINE_COMIC_API_KEY;
  const BASE_URL = "https://comicvine.gamespot.com/api";
  const PROXY = "https://corsproxy.io/?";

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${BASE_URL}/issues/?api_key=${API_KEY}&format=json&filter=volume:${volume.id}&sort=cover_date:desc&limit=20&field_list=id,name,issue_number,cover_date,image,site_detail_url,description`;
        const res = await fetch(PROXY + encodeURIComponent(url));
        if (!res.ok) throw new Error("Failed to load issues");
        const data = await res.json();
        const filtered = (data.results || [])
          .filter((issue) => {
            const name = (issue.name || "").toLowerCase().trim();
            return (
              name && !name.startsWith("no.") && !name.includes("untitled")
            );
          })
          .filter((issue) => issue.image?.screen_url || issue.image?.small_url);
        setIssues(filtered);
      } catch (err) {
        console.error(err);
        setError("Failed to load issues");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, [volume.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <Spinner />
          <p className="text-gray-400 mt-4 text-lg">Loading issues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📖</div>
        <p className="text-red-400 text-xl mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            {volume.name}
          </h2>
          <p className="text-gray-400 text-lg">{issues.length} issues found</p>
        </div>
      </div>
      {issues.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-400 text-xl mb-4">No issues found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueList;
