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
  const resetPasswordFormSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("validations.email_format"))
      .required(t("validations.field_required")),
  });

  const defaultValues = {
    email: "",
  };

  return { resetPasswordFormSchema, defaultValues };
};

const ResetPasswordGetForm = () => {
  const { t } = useTranslation();
  const [requestSend, setRequestSend] = useState(null);
  const { resetPasswordFormSchema, defaultValues } = getFormSchema(t);

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
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const onSubmit = async data => {
    try {
      setRequestSend(true);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/request-reset-password",
        "POST",
        JSON.stringify({
          email: data.email,
          redirectionUrl:
            process.env.REACT_APP_FRONTEND_URL + "/reset-password-post",
        }),
        { "Content-Type": "application/json" }
      );
    } catch (error) {}
  };

  return (
    <>
      {!errorsHttpRequest && requestSend && !isLoading ? (
        <Alert
          title={t("reset_password_form.notifications.success_get.title")}
          description={t(
            "reset_password_form.notifications.success_get.description"
          )}
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
            id="email"
            type="text"
            label={t("reset_password_form.content.input_email_label")}
            error={errors?.email?.message}
            register={register}
          />

          <Button
            htmlType="submit"
            shape="round"
            text={t("reset_password_form.content.button_reset_password")}
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

export default ResetPasswordGetForm;
