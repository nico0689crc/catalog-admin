import "./Button.css";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import Card from "../../UIElements/Card/Card";
import { useState, useRef, useEffect } from "react";
/**
 * Icons can be:
 *  With Icons or without icons **
 *
 *  With Text or without text **
 *
 *  With Shape **
 *      - default - Default
 *      - circle
 *      - round
 *
 *  With States
 *      - Default - Default
 *      - Active
 *      - Hover
 *      - Disabled
 *      - Loading
 *
 *  With Sizes ***
 *      - small
 *      - medium - Default
 *      - big
 *
 *  Block Button ****
 *      - full width
 *      - content width - Default
 *
 *  With Type ***
 *      - submit
 *      - reset
 *      - button
 *
 *  With Style Type ****
 *
 *      - Primary
 *      - Default
 *      - Dashed
 *      - Text Button
 *      - Link Button
 *
 *  With Onclick
 */

const BUTTON_CLASSES = {
  typeClasses: {
    primary: "button--primary",
    dashed: "button--dashed",
    text: "button--text",
    link: "button--link",
  },

  widthClasses: {
    block: "button--block",
  },

  sizesClasses: {
    small: "button--small",
    large: "button--large",
  },

  shapesClasses: {
    round: "button--round",
    circle: "button--circle",
  },
};

const BUTTON_SETTINGS = {
  htmlType: {
    submit: "submit",
    reset: "reset",
    button: "button",
  },
};

const getClasses = props => {
  const className = [];

  props.type &&
    BUTTON_CLASSES["typeClasses"][props.type] &&
    className.push(BUTTON_CLASSES["typeClasses"][props.type]);

  props.block && className.push(BUTTON_CLASSES["widthClasses"]["block"]);

  props.size &&
    BUTTON_CLASSES["sizesClasses"][props.size] &&
    className.push(BUTTON_CLASSES["sizesClasses"][props.size]);

  props.shape &&
    BUTTON_CLASSES["shapesClasses"][props.shape] &&
    className.push(BUTTON_CLASSES["shapesClasses"][props.shape]);

  props.className && className.push(props.className);

  const buttonClassesNames = className.join(" ");

  return buttonClassesNames;
};

const getSettings = props => {
  const buttonHtmlType =
    props.htmlType && BUTTON_SETTINGS["htmlType"][props.htmlType]
      ? BUTTON_SETTINGS["htmlType"][props.htmlType]
      : BUTTON_SETTINGS["htmlType"]["button"];

  return { buttonHtmlType };
};

/**
 * htmlType: submit, reset, button (default)
 * type: default (default), primary, dash, text, link
 * block: content (default), block
 * size: small, medium (default), large
 * shape: default (default), round, circle
 * className: extra ClassName to insert in the component
 * disabled
 * loading
 * text
 * icon
 * onClick
 */

const Button = props => {
  const buttonRef = useRef();
  const dropdownRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const { buttonHtmlType } = getSettings(props);
  const buttonClassesNames = getClasses(props);

  const dropdownItemsHandler = () => {
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showDropdown && buttonRef.current && dropdownRef.current) {
        if (
          buttonRef.current.contains(e.target) ||
          dropdownRef.current.contains(e.target)
        ) {
          setShowDropdown(true);
        } else {
          setShowDropdown(false);
        }
      }
    };

    props.dropdownItems &&
      document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      props.dropdownItems &&
        document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showDropdown, props.dropdownItems]);

  return (
    <>
      <button
        type={buttonHtmlType}
        onClick={props.dropdownItems ? dropdownItemsHandler : props.onClick}
        disabled={props.disabled || props.loading}
        className={`button ${buttonClassesNames} ${
          props.className ? props.className : ""
        }`}
        ref={buttonRef}
      >
        {!props.loading && props.icon && (
          <span className="button__icon">{props.icon}</span>
        )}
        {!props.loading && props.text && (
          <span className="button__text">{props.text}</span>
        )}

        {props.loading && (
          <span className="button__icon loading">
            <AiOutlineLoading />
          </span>
        )}

        {props.loading && (
          <span className="button__text">
            {props.loadingText ? props.loadingText : "Loading"}
          </span>
        )}
      </button>
      {props.dropdownItems && (
        <div
          className={`button__dropdown ${
            !showDropdown ? "button__dropdown--closed" : ""
          }`}
          ref={dropdownRef}
        >
          <ul className="button_dropdown-items">
            <Card>
              {props.dropdownItems.map((item, index) => {
                return (
                  <li key={index} className="button_dropdown-item">
                    {item.type === "router-link" && (
                      <Link to={item.to}>{item.label}</Link>
                    )}
                    {item.type === "function-perform" && (
                      <span onClick={item.onClick}>{item.label}</span>
                    )}
                  </li>
                );
              })}
            </Card>
          </ul>
        </div>
      )}
    </>
  );
};

export default Button;
