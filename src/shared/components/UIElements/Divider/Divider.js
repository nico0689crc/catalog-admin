import "./Divider.css";

const DIVIDER_CLASSES = {
  typeClasses: {
    vertical: "divider--vertical",
    horizontal: "divider--horizontal",
  },
  sizeClasses: {
    small: "divider--small",
    medium: "divider--medium",
    large: "divider--large",
  },
  orientationClasses: {
    left: "divider--left",
    right: "divider--right",
    center: "divider--center",
  },
};

const getClasses = props => {
  const className = [];

  props.type && DIVIDER_CLASSES["typeClasses"][props.type]
    ? className.push(DIVIDER_CLASSES["typeClasses"][props.type])
    : className.push(DIVIDER_CLASSES["typeClasses"]["horizontal"]);

  props.size && DIVIDER_CLASSES["sizeClasses"][props.size]
    ? className.push(DIVIDER_CLASSES["sizeClasses"][props.size])
    : className.push(DIVIDER_CLASSES["sizeClasses"]["medium"]);

  props.orientation && DIVIDER_CLASSES["orientationClasses"][props.orientation]
    ? className.push(DIVIDER_CLASSES["orientationClasses"][props.orientation])
    : className.push(DIVIDER_CLASSES["orientationClasses"]["center"]);

  const buttonClassesNames = className.join(" ");
  return buttonClassesNames;
};

/***
 *  type: vertical (default), horizontal
 *  orientatition: left, right, center(default)
 *  size: small, medium, large
 */

const Divider = props => {
  const buttonClassesNames = getClasses(props);
  let dividerElement;
  dividerElement = <div className={`divider ${buttonClassesNames}`}></div>;

  if (props.text && (!props.type || props.type === "horizontal")) {
    dividerElement = (
      <div className={`divider ${buttonClassesNames} divider--with-text`}>
        <span className="divider__text">{props.text}</span>
      </div>
    );
  }

  if (props.text && props.orientation === "vertical") {
    dividerElement = <div className={`divider ${buttonClassesNames}`}></div>;
  }

  return dividerElement;
};

export default Divider;
