import React, { useState, useEffect } from "react";
import "./search.css";

export const Search = (props) => {
  const [search, setSearch] = useState(props.search);

  useEffect(
    () => {
      setSearch(props.search.charAt(0).toUpperCase() + props.search.slice(1));
    },
    [props.search] // Occurs when the state within is changing
  );

  /**
   * When occrs event 'onChange' in the search input,
   * update the parent props {handleSearch} with the search text.
   * @param {onChange} event
   */
  function updateSearch(event) {
    // Get the search text when occurs event 'onChange'
    let searchText = event.target.value.substr(0, 30).toLowerCase();
    setSearch(searchText);

    // Update the parent's props {handleSearch} with the search text
    props.handleSearch(searchText);
  }

  function deleteSearch() {
    // Get the search text when occurs event 'delete search'
    let searchText = "";
    setSearch(searchText);

    // Update the parent's props {handleSearch} with the search text
    props.handleSearch(searchText);
  }

  const updateSearchOnSubmit = (e) => {
    e.preventDefault();
    props.handleSearch(search);
  };

  return (
    <div id="searchContainer" className="search-container">
      <i id="searchIcon" className="fa fa-search search-icon" />
      <form onSubmit={updateSearchOnSubmit}>
        <input
          id="searchInput"
          className="search-input"
          onChange={updateSearch}
          placeholder="Search"
          value={search}
        />
      </form>

      <i
        className={
          search
            ? "fas fa-times delete-icon show"
            : "fas fa-times delete-icon hide"
        }
        onClick={deleteSearch}
      />
    </div>
  );
};
