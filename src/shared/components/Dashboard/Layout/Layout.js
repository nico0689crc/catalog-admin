import { useState } from "react";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.css";

const Layout = props => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const openSidebarHandle = () => {
    setIsOpenSidebar(prev => !prev);
  };

  return (
    <div className="layout">
      <Header onClickOpenSideBar={openSidebarHandle} />
      <Content>
        <Sidebar
          onClickCloseSideBar={openSidebarHandle}
          isOpenSidebar={isOpenSidebar}
        />
        <Main>{props.children}</Main>
      </Content>
    </div>
  );
};

export default Layout;
