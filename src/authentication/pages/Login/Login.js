import { useTranslation } from "react-i18next";
import Divider from "../../../shared/components/UIElements/Divider/Divider";
import Links from "../../../shared/components/FormElements/Links/Links";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  const { t } = useTranslation();

  return (
    <AuthPanel>
      <AuthPanel.Header />
      <Divider text={t("login_form.dividers.first")} size="small" />
      <AuthPanel.Content>
        <LoginForm />
      </AuthPanel.Content>
      <Divider size="medium" text={t("login_form.dividers.second")} />
      <AuthPanel.Footer>
        <span>{t("login_form.footer.span")} </span>
        <Links
          type="primary"
          text={t("login_form.footer.register_button")}
          to={`/register`}
        />
      </AuthPanel.Footer>
    </AuthPanel>
  );
};

export default Login;
