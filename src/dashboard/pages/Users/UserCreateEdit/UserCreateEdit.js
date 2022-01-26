import { useContext, useState } from "react";
import { AuthContext } from "../../../../shared/context/auth-contex";
import { DataTableContext } from "../../../../shared/components/UIElements/DataTable/DataTable";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { useHttpClient } from "../../../../shared/hooks/http-hook";

import Input from "../../../../shared/components/FormElements/Input/Input";
import Button from "../../../../shared/components/FormElements/Button/Button";
import Divider from "../../../../shared/components/UIElements/Divider/Divider";
import AlertError from "../../../../shared/containers/EntityAlert/EntityAlertError";
import AlertSuccess from "../../../../shared/containers/EntityAlert/EntityAlertSuccess";
import Select from "../../../../shared/components/FormElements/Select/Select";
import "./UserCreateEdit.css";

const getFormSchema = (t, item) => {
  const shape = {
    name: yup
      .string()
      .required(t("validations.field_required"))
      .min(6, t("validations.min_length_6")),
    email: yup
      .string()
      .email(t("validations.email_format"))
      .required(t("validations.field_required")),
    role: yup.string().ensure().required(t("validations.field_required")),
  };

  if (!item) {
    shape["password"] = yup
      .string()
      .required(t("validations.field_required"))
      .min(6, t("validations.min_length_6"))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        t("validations.password_format")
      );
  }

  if (item) {
    shape["status"] = yup
      .string()
      .ensure()
      .required(t("validations.field_required"));
  }

  const formSchema = yup.object().shape(shape);

  const defaultValues = {
    name: item ? item.name : "",
    email: item ? item.email : "",
    role: item ? item.role : "",
    status: item ? item.status : "",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const UserCreateEdit = ({ item, ...props }) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const dataTableContext = useContext(DataTableContext);

  const [requestSend, setRequestSend] = useState(null);

  const httpClientHook = useHttpClient();
  const formHook = useForm(getFormSchema(t, item));

  const onSubmit = async data => {
    setRequestSend(true);
    const body = {
      name: data.name,
      email: data.email,
      role: data.role,
    };
    if (!item) {
      body["password"] = data.password;
    }
    if (item) {
      body["status"] = data.status;
    }

    const url = item
      ? process.env.REACT_APP_BACKEND_URL + "/users/" + item.id
      : process.env.REACT_APP_BACKEND_URL + "/users/registration";

    await httpClientHook.sendRequest(
      url,
      item ? "PATCH" : "POST",
      JSON.stringify(body),
      {
        "Content-Type": "application/json",
        Authorization: "Barrer " + auth.token,
      }
    );
    dataTableContext.setShouldRefreshDataTable(true);
  };

  return (
    <div className="entity-new">
      {!httpClientHook.error && requestSend && !httpClientHook.isLoading ? (
        <AlertSuccess
          title={t("user_create_edit_form.alert_success_title")}
          description={t("user_create_edit_form.alert_success_description")}
          buttonText={t("common.button_close_modal")}
          closeModal={props.closeModal}
        />
      ) : (
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <AlertError
            errorsHttpRequest={httpClientHook.error}
            clearError={httpClientHook.clearError}
          />
          <div className="row">
            <div className="column full-witdh">
              <Input
                id="name"
                type="text"
                label={t("user_create_edit_form.input_name_label")}
                error={formHook?.formState?.errors?.name?.message}
                register={formHook.register}
              />
              <Input
                id="email"
                type="text"
                label={t("user_create_edit_form.input_email_label")}
                error={formHook?.formState?.errors?.name?.message}
                register={formHook.register}
              />
              {!item && (
                <Input.Password
                  id="password"
                  type="password"
                  label={t("user_create_edit_form.input_password_label")}
                  hideForgotLink
                  error={formHook?.formState?.errors?.password?.message}
                  register={formHook.register}
                />
              )}

              <Select
                name="role"
                control={formHook.control}
                options={[
                  { label: "User", value: "user" },
                  { label: "Admin", value: "admin" },
                ]}
                label={t("user_create_edit_form.select_role_label")}
                placeholder={t("common.select_placeholder")}
                error={formHook?.formState?.errors?.role?.message}
              />

              {item && (
                <Select
                  name="status"
                  control={formHook.control}
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Pending", value: "pending" },
                    { label: "Locked", value: "locked" },
                  ]}
                  label={t("user_create_edit_form.select_status_label")}
                  placeholder={t("common.select_placeholder")}
                  error={formHook?.formState?.errors?.status?.message}
                />
              )}
            </div>
          </div>
          <Divider />
          <div className="row">
            <Button
              type="primary"
              htmlType="submit"
              text={
                item
                  ? t("common.button_edit_modal")
                  : t("common.button_create_modal")
              }
              block
              loading={httpClientHook.isLoading}
              loadingText={t("common.button_loading_text")}
              shape="round"
              onClick={() => {}}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default UserCreateEdit;
