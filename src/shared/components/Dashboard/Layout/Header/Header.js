import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-contex";
import { useTranslation } from "react-i18next";
import { RiMenu5Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";

import LanguageSelector from "../../../LanguageSelector/LanguageSelector";
import Logo from "./Logo";
import Button from "../../../FormElements/Button/Button";
import "./Header.css";

const Header = props => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <header className="header">
      <nav>
        <Button
          htmlType="submit"
          shape="round"
          type="text"
          size="large"
          icon={<RiMenu5Fill />}
          onClick={props.onClickOpenSideBar}
          className="toggle-sidebar-button"
        />

        <Logo className="logo" />
        <div className="righ-side-actions">
          <LanguageSelector />
          <div className="user-actions">
            <Button
              className="button--gray"
              htmlType="submit"
              shape="circle"
              type="text"
              size="medium"
              icon={<FaUserAlt />}
              dropdownItems={[
                {
                  label: t("header.user_actions.logout"),
                  type: "function-perform",
                  onClick: function () {
                    auth.logout();
                  },
                },
              ]}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
