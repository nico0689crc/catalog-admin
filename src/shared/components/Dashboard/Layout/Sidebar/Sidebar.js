import { IoMdCloseCircleOutline } from "react-icons/io";
import SidebarItems from "./SidebarItems";
import Button from "../../../FormElements/Button/Button";
import Logo from "../Header/Logo";
import Backdrop from "../../../UIElements/Backdrop/Backdrop";
import items from "../../../../content/sidebarItems";
import "./Sidebar.css";

const Sidebar = props => {
  const sidebarItems = <SidebarItems items={items} />;

  return (
    <>
      <Backdrop
        show={props.isOpenSidebar}
        onClick={props.onClickCloseSideBar}
      />
      <aside
        className={`sidebar-mobile ${
          !props.isOpenSidebar ? "sidebar--close" : ""
        }`}
      >
        <header className="sidebar-mobile__header">
          <Logo className="sidebar-mobile__logo" />
          <Button
            htmlType="submit"
            shape="circle"
            type="text"
            size="large"
            icon={<IoMdCloseCircleOutline />}
            onClick={props.onClickCloseSideBar}
          />
        </header>
        <div className="sidebar-mobile__items">{sidebarItems}</div>
      </aside>
      <aside className="sidebar-desktop">{sidebarItems}</aside>
    </>
  );
};

export default Sidebar;
