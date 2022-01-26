import "./Backdrop.css";

const Backdrop = props => {
  return (
    <div
      className={`backdrop ${!props.show ? "backdrop--close" : ""}`}
      onClick={props.onClick}
    ></div>
  );
};

export default Backdrop;
