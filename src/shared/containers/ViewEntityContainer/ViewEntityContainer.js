import "./ViewEntityContainer.css";

const ViewEntityContainer = ({ large, children }) => {
  return (
    <div className={`entity-view  ${large && "entity-view--large"}`}>
      {children}
    </div>
  );
};

ViewEntityContainer.Column = function ViewEntityContainerColumn({
  children,

  size = "full",
}) {
  return (
    <div
      className={`entity-view__column ${
        size === "half"
          ? "entity-view__column--half-width"
          : "entity-view__column--full-width"
      }`}
    >
      {children}
    </div>
  );
};

ViewEntityContainer.Item = function ViewEntityContainerItem({
  label = "",
  content = <></>,
  flexDirection = "flex-row",
  style,
}) {
  return (
    <div style={style} className={`entity-view__item ${flexDirection}`}>
      <div className={`entity-view__label`}>{label}</div>
      <div className={`entity-view__content`}>{content}</div>
    </div>
  );
};

export default ViewEntityContainer;
