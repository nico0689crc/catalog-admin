import "./Alert.css";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from "../../FormElements/Button/Button";
/**
 * Alert requirements:
 * - type: success, info, warning, error
 * - icon: ReactNode
 * - showIcon: boolean
 * - message: string
 * - description: string
 * - closeable: boolean
 */

const ALERT_CLASSES = {
  typeClasses: {
    success: "alert--success",
    info: "alert--info",
    warning: "alert--warning",
    error: "alert--error",
  },
};

const Alert = props => {
  const alertType =
    props.type && ALERT_CLASSES["typeClasses"][props.type]
      ? ALERT_CLASSES["typeClasses"][props.type]
      : ALERT_CLASSES["typeClasses"]["info"];

  return (
    <div className={`alert ${alertType}`}>
      {props.showIcon && (
        <span className="alert__icon">
          {props.icon && props.icon}
          {!props.icon && props.type === "success" && <AiOutlineCheckCircle />}
          {(!props.icon && props.type === "info") ||
            (!props.icon && !props.type && <AiOutlineInfoCircle />)}
          {!props.icon && props.type === "error" && <AiOutlineCloseCircle />}
          {!props.icon && props.type === "warning" && (
            <AiOutlineExclamationCircle />
          )}
        </span>
      )}
      <div className="alert__message">
        <div className="message__inner">
          {props.title && <div className="alert__title">{props.title}</div>}
          {props.description && (
            <div className="alert__description">{props.description}</div>
          )}
        </div>
      </div>
      {props.closeable && (
        <div className="alert__close">
          <Button
            type="text"
            shape="round"
            onClick={props.onClick}
            icon={<AiOutlineClose />}
          />
        </div>
      )}
    </div>
  );
};

export default Alert;
