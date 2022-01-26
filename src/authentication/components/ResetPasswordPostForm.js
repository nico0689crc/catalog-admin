import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import Alert from "../../shared/components/UIElements/Alert/Alert";

const getFormSchema = t => {
  const resetPasswordFormSchema = yup.object().shape({
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
    password: "",
  };

  return { resetPasswordFormSchema, defaultValues };
};

const ResetPasswordPostForm = props => {
  const { t } = useTranslation();
  const [requestSend, setRequestSend] = useState(null);
  const searchParams = useSearchParams()[0];
  const { resetPasswordFormSchema, defaultValues } = getFormSchema(t);

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");

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
        process.env.REACT_APP_BACKEND_URL + "/users/reset-password",
        "POST",
        JSON.stringify({
          token,
          userId,
          password: data.password,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (error) {}
  };

  return (
    <>
      {!errorsHttpRequest && requestSend && !isLoading ? (
        <Alert
          title={t("reset_password_form.notifications.success_post.title")}
          description={t(
            "reset_password_form.notifications.success_post.description"
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
          <Input.Password
            id="password"
            type="password"
            label={t("reset_password_form.content.input_password_label")}
            hideForgotLink
            error={errors?.password?.message}
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

export default ResetPasswordPostForm;
