import React, { useState, useCallback } from "react";
import "./floating-arrow.css";

export const FloatingArrow = () => {
  return (
    <a href="#">
      <div className="arrow-container">
        <div className="round">
          <i className="fa fa-angle-up arrow" />
          <i className="fa fa-angle-up arrow bottom-arrow" />
        </div>
      </div>
    </a>
  );
};
