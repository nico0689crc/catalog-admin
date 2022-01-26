import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useTranslation } from "react-i18next";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import Alert from "../../shared/components/UIElements/Alert/Alert";

const getFormSchema = t => {
  const registerFormSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("validations.field_required"))
      .min(6, t("validations.min_length_6")),
    email: yup
      .string()
      .email(t("validations.email_format"))
      .required(t("validations.field_required")),
    password: yup
      .string()
      .required(t("validations.field_required"))
      .min(6, t("validations.min_length_6"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        t("validations.password_format")
      ),
  });

  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  return { registerFormSchema, defaultValues };
};

const RegisterForm = () => {
  const [requestSend, setRequestSend] = useState(null);
  const { t } = useTranslation();
  const { registerFormSchema, defaultValues } = getFormSchema(t);

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
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async data => {
    try {
      setRequestSend(true);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/registration",
        "POST",
        JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          redirectionUrl:
            process.env.REACT_APP_FRONTEND_URL + "/account-activation",
        }),
        { "Content-Type": "application/json" }
      );
    } catch (error) {}
  };

  return (
    <>
      {!errorsHttpRequest && requestSend && !isLoading ? (
        <Alert
          title={t("register_form.notifications.success.title")}
          description={t("register_form.notifications.success.description")}
          type="success"
          showIcon
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorsHttpRequest?.errors.map((error, index) => (
            <Alert
              key={index}
              title={error.title}
              description={error.detail}
              type="error"
              showIcon
              closeable
              onClick={clearError}
            />
          ))}
          <Input
            id="name"
            type="text"
            label={t("register_form.content.input_name_label")}
            error={errors?.name?.message}
            register={register}
          />
          <Input
            id="email"
            type="text"
            label={t("register_form.content.input_email_label")}
            error={errors?.email?.message}
            register={register}
          />
          <Input.Password
            id="password"
            type="password"
            label={t("register_form.content.input_password_label")}
            hideForgotLink
            error={errors?.password?.message}
            register={register}
          />
          <Button
            htmlType="submit"
            shape="round"
            text={t("register_form.content.button_register")}
            type="primary"
            loading={isLoading}
            loadingText={t("common.button_loading_text")}
            block
            onClick={() => {}}
          />
        </form>
      )}
    </>
  );
};

export default RegisterForm;
