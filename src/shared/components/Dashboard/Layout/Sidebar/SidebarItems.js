import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-contex";
import SidebarItem from "./SidebarItem";
import "./SidebarItems.css";

const SidebarItems = props => {
  const { items } = props;
  const auth = useContext(AuthContext);
  const { permissions } = auth.attributes;

  return (
    <div className="sidebar-items">
      {items.map((item, index) => {
        let sidebarItem = <SidebarItem key={index} {...item} />;

        if (permissions[item.entity]) {
          sidebarItem = permissions[item.entity].get.others ? (
            <SidebarItem key={index} {...item} />
          ) : null;
        }

        return sidebarItem;
      })}
    </div>
  );
};

export default SidebarItems;
