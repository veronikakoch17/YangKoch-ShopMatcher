/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const IconsListFilter = ({
  outline,
  className,
  unionClassName,
  union = "https://c.animaapp.com/cFf6Cu8i/img/union.svg",
}) => {
  return (
    <div className={`icons-list-filter ${className}`}>
      <img
        className={`union ${outline} ${unionClassName}`}
        alt="Union"
        src={outline === "off" ? "https://c.animaapp.com/cFf6Cu8i/img/union-3.svg" : union}
      />
    </div>
  );
};

IconsListFilter.propTypes = {
  outline: PropTypes.oneOf(["off", "on"]),
  union: PropTypes.string,
};
