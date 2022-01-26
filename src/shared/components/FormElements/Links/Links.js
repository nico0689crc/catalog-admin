import { Link } from "react-router-dom";
import "./Links.css";

/**
 * to: url path
 * size: small, medium, large
 * type: primary,default
 * text
 */

const LINK_CLASSES = {
  typeClasses: {
    primary: "link--primary",
  },

  sizeClasses: {
    small: "link--small",
    medium: "link--medium",
    large: "link--large",
  },
};

const getClasses = props => {
  const className = [];

  props.type &&
    LINK_CLASSES["typeClasses"][props.type] &&
    className.push(LINK_CLASSES["typeClasses"][props.type]);

  props.size && LINK_CLASSES["sizeClasses"][props.size]
    ? className.push(LINK_CLASSES["sizeClasses"][props.size])
    : className.push(LINK_CLASSES["sizeClasses"]["medium"]);

  const buttonClassesNames = className.join(" ");

  return buttonClassesNames;
};

const Links = props => {
  const linksClassesNames = getClasses(props);

  return (
    <Link className={`link ${linksClassesNames}`} to={props.to}>
      {props.text}
    </Link>
  );
};

export default Links;
