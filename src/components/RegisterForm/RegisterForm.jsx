import React, { useState } from "react";
import { api } from "../../services/api";
import { Button } from "../Button";
import { ChangeFormButton } from "../ChangeFormButton";
import { Input } from "../Input";
import "./style.scss";

export function RegisterForm({ onClickChangeForm, onSubmit, showLoader }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeFullname = (e) => {
    setFullName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onRegister = async (e) => {
    if (!fullName || !email || !password) {
      alert("Fill all fields, please!");
      return;
    }
    e.preventDefault();

    try {
      showLoader(true);
      const res = await api.registration(email, fullName, password);
      onSubmit(res);
      showLoader(false);
    } catch (error) {
      console.log(error);
      showLoader(false);
    }
  };

  return (
    <form className="register__form">
      <h3 className="form__title">Registration</h3>
      <Input label={"Full name"} value={fullName} onChange={onChangeFullname} />
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
        <Button title={"Register"} onClick={onRegister} />
      </div>

      <ChangeFormButton type="register" onClick={() => onClickChangeForm(1)} />
    </form>
  );
}
