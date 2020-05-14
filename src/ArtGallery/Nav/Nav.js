import React, { useState, useCallback } from "react";
import "./nav.css";
import { Search } from "../Search/Search";
export const Nav = props => {
  const [search, setSearch] = useState(props.search);
  console.log("inside nav", props.search);
  // Recieve search data from Search component, init search state
  const recieveSearchText = useCallback(
    propsChild => {
      // Update searched text in the state
      setSearch(props);

      // Update the parent's props {handleNavSearch} with the search text
      // (ArtGallery component - Search grandparent component)
      props.handleNavSearch(propsChild);
    },
    [] //search
  );

  const logo =
    "https://avatars1.githubusercontent.com/u/40990488?s=460&u=746bedd30b0b1172e701889d5bd9159465b93909&v=4";

  return (
    <div id="navContainer" className="nav-container">
      <div id="logoContainer" className="logo-container">
        <img id="logoImage" className="logo-image" alt="logo" src={logo} />
      </div>
      <Search search={props.search} handleSearch={recieveSearchText} />
      <div id="iconsContainer" className="icons-container">
        <div id="homeIconContainer" className="icon-container">
          <i id="home" className="fa fa-home icon bar-icon" />
        </div>
        <div id="contactIconContainer" className="icon-container">
          <i id="contact" className="fa fa-envelope icon bar-icon" />
        </div>
      </div>
    </div>
  );
};
