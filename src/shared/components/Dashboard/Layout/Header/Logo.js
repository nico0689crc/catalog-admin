import "./Logo.css";

const Logo = props => {
  return (
    <div className={`${props.className ? props.className : ""}`}>
      Catalog Product
    </div>
  );
};

export default Logo;
