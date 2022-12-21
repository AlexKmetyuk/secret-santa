import React, { useState } from "react";
import { api } from "../../services/api";
import { Button } from "../Button";
import { ChangeFormButton } from "../ChangeFormButton";
import { Input } from "../Input";
import "./style.scss";

export function LoginForm({ onClickChangeForm, onSubmit, showLoader }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e) => {
    if (!email || !password) {
      alert("Fill all fields, please!");
      return;
    }
    e.preventDefault();
    try {
      showLoader(true);
      const res = await api.login(email, password);
      onSubmit(res);
      showLoader(false);
    } catch (error) {
      console.log(error);
      showLoader(false);
    }
  };

  return (
    <form className="login__form">
      <h3 className="form__title">Login</h3>
      <Input
        label={"Email"}
        value={email}
        onChange={onChangeEmail}
        type="email"
      />
      <Input
        label={"Password"}
        value={password}
        onChange={onChangePassword}
        type="password"
      />
      <div className="button__wrapper">
        <Button title={"Login"} onClick={onLogin} />
      </div>

      <ChangeFormButton type="login" onClick={() => onClickChangeForm(0)} />
    </form>
  );
}
