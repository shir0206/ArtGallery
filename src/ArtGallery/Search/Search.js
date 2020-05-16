import React, { useState, useEffect } from "react";
import "./search.css";

export const Search = (props) => {
  const [search, setSearch] = useState(props.search);

  // const [search, setSearch] = useState();

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
    console.log(123);
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
          // value={props.search.charAt(0).toUpperCase() + props.search.slice(1)}
          value={search}
        />
        {search && (
          <i className="fas fa-times delete-icon" onClick={deleteSearch} />
        )}
      </form>
    </div>
  );
};
