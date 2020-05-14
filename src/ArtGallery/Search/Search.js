import React, { useState } from "react";
// import "./styles.css";
import "./search.css";

export const Search = props => {
  const [search, setSearch] = useState(props.search);

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

  const updateSearchOnSubmit = e => {
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
          placeholder="What are you looking for?"
          value={props.search.charAt(0).toUpperCase() + props.search.slice(1)}
        />
      </form>
    </div>
  );
};
