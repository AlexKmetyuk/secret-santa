import React from "react";
import "./style.css";

export function Input({ label, value, onChange, type }) {
  return (
    <div className="input__wrapper">
      <label className="input__label">{label}</label>
      <input
        className="input"
        value={value}
        onChange={onChange}
        type={type}
        autoComplete="on"
      />
    </div>
  );
}
