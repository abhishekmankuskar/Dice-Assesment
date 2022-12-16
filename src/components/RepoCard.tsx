export const RepoCard = ({
  avatar_url,
  name,
  stargazers_count,
  description,
  language,
}: any) => {
  return (
    <div className="repo-card">
      <img src={avatar_url} alt="avatar" />
      <div className="repo-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>Language: {language}</p>
        <p>Stars: {stargazers_count}</p>
      </div>
    </div>
  );
};
