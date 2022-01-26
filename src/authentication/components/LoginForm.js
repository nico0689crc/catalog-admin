import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-contex";
import { useTranslation } from "react-i18next";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import Alert from "../../shared/components/UIElements/Alert/Alert";

const getFormSchema = t => {
  const loginFormSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("validations.email_format"))
      .required(t("validations.field_required")),
    password: yup.string().required(t("validations.field_required")),
  });

  const defaultValues = {
    email: "",
    password: "",
  };

  return { loginFormSchema, defaultValues };
};

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const { loginFormSchema, defaultValues } = getFormSchema(t);

  const {
    isLoading,
    error: errorsHttpRequest,
    sendRequest,
    clearError,
  } = useHttpClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async data => {
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/authentication",
        "POST",
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        { "Content-Type": "application/json" }
      );
      auth.login(responseData.data.id, responseData.data.attributes);
    } catch (error) {}
  };

  return (
    <>
      {errorsHttpRequest && (
        <Alert
          title={errorsHttpRequest.errors[0].title}
          description={errorsHttpRequest.errors[0].detail}
          type="error"
          showIcon
          closeable
          onClick={clearError}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          type="text"
          label={t("login_form.content.input_email_label")}
          error={errors?.email?.message}
          register={register}
        />
        <Input.Password
          id="password"
          type="password"
          label={t("login_form.content.input_password_label")}
          labelLinkTo="/reset-password-get"
          loadingText={t("common.button_loading_text")}
          labelLinkType="primary"
          labelLinkSize="small"
          labelLinkText={t("login_form.content.link_forgot_pass_text")}
          error={errors?.password?.message}
          register={register}
        />

        <Button
          htmlType="submit"
          shape="round"
          text={t("login_form.content.button_login")}
          type="primary"
          loading={isLoading}
          loadingText={t("common.button_loading_text")}
          block
          onClick={() => {}}
        />
      </form>
    </>
  );
};

export default LoginForm;
