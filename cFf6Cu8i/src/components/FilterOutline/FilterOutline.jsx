/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { IconsListFilter } from "../IconsListFilter";
import "./style.css";

export const FilterOutline = ({ className }) => {
  return (
    <div className={`filter-outline ${className}`}>
      <IconsListFilter
        className="filter"
        outline="on"
        union="https://c.animaapp.com/cFf6Cu8i/img/union-2.svg"
        unionClassName="icons-list-filter-instance"
      />
    </div>
  );
};
