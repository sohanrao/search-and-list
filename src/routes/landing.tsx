import { useState } from "react";
import { Outlet, Link, NavLink, useNavigation } from "react-router-dom";
import "./landing.scss";
import useStickyHeader from "../hooks/useStickyHeader";

const genres = [
  "fiction",
  "non-fiction",
  "self-help",
  "biography",
  "education",
  "food",
  "music",
  "movies",
  "crime",
];

export default function Landing() {
  const navigation = useNavigation();
  const sticky = useStickyHeader();

  return (
    <>
      {sticky && (
        <div className="app__header--sticky">
          <div>
            <Link to={"/"}>All You Can Read</Link>
            <SearchInput />
          </div>
        </div>
      )}
      <div className="app__header">
        <div>
          <Link to={"/"} className="app__header--logo">
            All You Can Read
          </Link>
        </div>
        {!sticky && <SearchInput />}
        <div className="app__search--tags">
          <span>Popular categories:</span>
          {genres.map((genre) => (
            <NavLink
              key={genre}
              to={`genre/${genre}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {genre}
            </NavLink>
          ))}
        </div>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}

function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <div className="app__search">
      <input
        type="search"
        name="search"
        placeholder="Search by title"
        onChange={(event) => setQuery(event.target.value)}
      />
      <Link to={`search?q=${query}`} className="app__search--button">
        Search
      </Link>
    </div>
  );
}
