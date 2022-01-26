import { useState } from "react";
import Links from "../Links/Links";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import "./Input.css";

const Input = props => {
  const elementHtml =
    props.type === "textarea" ? (
      <textarea
        id={props.id}
        name={props.id}
        rows="10"
        cols="50"
        {...props.register(props.id)}
      ></textarea>
    ) : (
      <input
        id={props.id}
        name={props.id}
        type={props.type}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...props.register(props.id)}
      />
    );

  return (
    <div
      className={`input-form-control ${
        props.error && "input-form-control--invalid"
      }`}
    >
      {props.labelLinkTo && props.labelLinkText && (
        <div className="input-form-control__label-with-link">
          <label htmlFor={props.id}>{props.label}</label>
          <Links
            to={props.labelLinkTo}
            text={props.labelLinkText}
            type={props.labelLinkType || null}
            size={props.labelLinkSize || null}
          />
        </div>
      )}
      {!props.labelLinkTo && !props.labelLinkText && (
        <label htmlFor={props.id}>{props.label}</label>
      )}
      {elementHtml}
      <p>{props.error}</p>
    </div>
  );
};

Input.Password = function InputPassword(props) {
  const [showPassword, setShowPassword] = useState(false);

  const elementHtml = (
    <input
      id={props.id}
      name={props.id}
      type={showPassword ? "text" : "password"}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...props.register(props.id)}
    />
  );

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div
      className={`input-form-control ${
        props.error && "input-form-control--invalid"
      }`}
    >
      <div className="input-form-control__label-with-link">
        <label htmlFor={props.id}>{props.label}</label>
        {!props.hideForgotLink && (
          <Links
            to={props.labelLinkTo}
            text={props.labelLinkText}
            type={props.labelLinkType || null}
            size={props.labelLinkSize || null}
          />
        )}
      </div>
      <div className="input-form-control__input-password">
        {elementHtml}
        <span
          className="input-password__show-password-icon"
          onClick={showPasswordHandler}
        >
          {showPassword === true ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>
      <p>{props.error}</p>
    </div>
  );
};

export default Input;
