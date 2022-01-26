import { useTranslation } from "react-i18next";
import Divider from "../../../shared/components/UIElements/Divider/Divider";
import Links from "../../../shared/components/FormElements/Links/Links";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import ResetPasswordGetForm from "../../components/ResetPasswordGetForm";

const ResetPasswordGet = () => {
  const { t } = useTranslation();
  return (
    <AuthPanel>
      <AuthPanel.Header />
      <Divider text={t("reset_password_form.dividers.first")} size="small" />
      <AuthPanel.Content>
        <ResetPasswordGetForm />
      </AuthPanel.Content>
      <Divider size="medium" text={t("reset_password_form.dividers.second")} />
      <AuthPanel.Footer>
        <span>{t("reset_password_form.footer.span")} </span>
        <Links
          type="primary"
          text={t("reset_password_form.footer.login_button")}
          to={`/login`}
        />
      </AuthPanel.Footer>
    </AuthPanel>
  );
};

export default ResetPasswordGet;
