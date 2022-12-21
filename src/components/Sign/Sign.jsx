import React, { useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";

import "./style.css";

export function Sign({ onSubmit, showLoader }) {
  const [type, setType] = useState(0);

  return (
    <div className="sign">
      {type ? (
        <LoginForm
          onClickChangeForm={setType}
          onSubmit={onSubmit}
          showLoader={showLoader}
        />
      ) : (
        <RegisterForm
          onClickChangeForm={setType}
          onSubmit={onSubmit}
          showLoader={showLoader}
        />
      )}
    </div>
  );
}
