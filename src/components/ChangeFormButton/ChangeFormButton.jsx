import React from "react";
import "./style.css";

export function ChangeFormButton({ type, onClick }) {
  return (
    <div className="change-form">
      <span className="change-form__text">
        {type === "login" ? "Not registered?" : "Already registered?"}
      </span>
      <span className="change-form__clickable" onClick={onClick}>
        {type === "login" ? "Sign up" : "Sign in"}
      </span>
    </div>
  );
}
