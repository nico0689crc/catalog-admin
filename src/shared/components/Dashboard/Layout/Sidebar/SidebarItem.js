import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import "./SidebarItem.css";

const SidebarItem = props => {
  const { t } = useTranslation();
  const location = useLocation();
  const activeClass = location.pathname.includes(props.to) ? "active" : "";
  return (
    <div className={`siderbar-item ${activeClass}`}>
      <Link className="siderbar-item__link" to={props.to}>
        {props.icon}
        <span className="sidebar-item__label">{t(props.label)}</span>
      </Link>
    </div>
  );
};

export default SidebarItem;
