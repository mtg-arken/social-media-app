function ProfileTabs(props) {
  function handleClick(e) {
    props.setTab(e.target.getAttribute("data-value"));
  }

  return (
    <ul className="nav nav-tabs">
      <li
        className={`nav-link ${props.tab === "Posts" ? "active" : ""}`}
        data-value="Posts"
        onClick={handleClick}
      >
        posts
      </li>
      <li
        className={`nav-link ${props.tab === "Liked" ? "active" : ""}`}
        data-value="Liked"
        onClick={handleClick}
      >
        liktes
      </li>
      <li
        className={`nav-link ${props.tab === "Comments" ? "active" : ""}`}
        data-value="Comments"
        onClick={handleClick}
      >
        comments
      </li>
    </ul>
  );
}

export default ProfileTabs;
