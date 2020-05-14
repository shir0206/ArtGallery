import React, { useState, useEffect } from "react";
import "./app.css";
import { ArtGallery } from "../ArtGallery/ArtGallery";

export default function App() {
  const { height, width } = useWindowDimensions();

  return (
    <div className="App">
      <ArtGallery windowWidth={width} />
    </div>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
