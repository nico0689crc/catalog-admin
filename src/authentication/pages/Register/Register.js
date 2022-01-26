import { useTranslation } from "react-i18next";
import Divider from "../../../shared/components/UIElements/Divider/Divider";
import Links from "../../../shared/components/FormElements/Links/Links";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import RegisterForm from "../../components/RegisterForm";

const Register = () => {
  const { t } = useTranslation();
  return (
    <AuthPanel>
      <AuthPanel.Header />
      <Divider text={t("register_form.dividers.first")} size="small" />
      <AuthPanel.Content>
        <RegisterForm />
      </AuthPanel.Content>
      <Divider size="medium" text={t("register_form.dividers.second")} />
      <AuthPanel.Footer>
        <span>{t("register_form.footer.span")} </span>
        <Links
          type="primary"
          text={t("register_form.footer.login_button")}
          to={`/login`}
        />
      </AuthPanel.Footer>
    </AuthPanel>
  );
};

export default Register;
