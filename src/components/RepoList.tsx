import React, { useState, useEffect } from "react";
import axios from "axios";
import { RepoCard } from "./RepoCard";

export const RepoList = () => {
  const [repos, setRepos] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<any>("stargazers_count");

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchTerm}`
      );
      setRepos(response.data.items);
    };

    const getData = setTimeout(() => {
      fetchRepos();
      console.log(repos[0]);
    }, 2000);

    return () => clearTimeout(getData);
  }, [searchTerm, sortField]);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value);
  };

  const sortedRepos = repos.sort((a: any, b: any) => {
    return (b[sortField] as number) - (a[sortField] as number);
  });

  return (
    <div className="repo-list">
      <div className="search-container">
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <select value={sortField} onChange={handleSortChange}>
          <option value="stargazers_count">Stars</option>
          <option value="watchers_count">Watchers</option>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="created_at">Created At</option>
          <option value="updated_at">Updated At</option>
        </select>
      </div>
      <div className="repoContainer">
        {sortedRepos.map((repo: any, index: number) => (
          <RepoCard
            key={index}
            avatar_url={repo.owner.avatar_url}
            name={repo.name}
            stargazers_count={repo.stargazers_count}
            description={repo.description}
            language={repo.language}
          />
        ))}
      </div>
    </div>
  );
};
