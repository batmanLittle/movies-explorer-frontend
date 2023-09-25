import React from "react";
import "./InfoTooltip.css";

function InfoTooltip({ errorText }) {
  return <p className="info-tooltip__error">{errorText}</p>;
}

export default InfoTooltip;
