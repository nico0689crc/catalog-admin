import { useContext, useState } from "react";
import { AuthContext } from "../../../../shared/context/auth-contex";
import { DataTableContext } from "../../../../shared/components/UIElements/DataTable/DataTable";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import iconsList from "./iconsList";
import * as categoriesIcons from "../../../../shared/components/UIElements/Icons/Categories";

import Input from "../../../../shared/components/FormElements/Input/Input";
import Button from "../../../../shared/components/FormElements/Button/Button";
import Divider from "../../../../shared/components/UIElements/Divider/Divider";
import AlertError from "../../../../shared/containers/EntityAlert/EntityAlertError";
import AlertSuccess from "../../../../shared/containers/EntityAlert/EntityAlertSuccess";
import Select from "../../../../shared/components/FormElements/Select/Select";
import "./CategoryCreateEdit.css";

const getFormSchema = (t, item) => {
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("validations.field_required"))
      .min(10, t("validations.min_length_10")),
    icon: yup.string().ensure().required(t("validations.field_required")),
    description: yup
      .string()
      .required(t("validations.field_required"))
      .min(30, t("validations.min_length_30")),
  });

  const defaultValues = {
    name: item ? item.name : "",
    icon: item ? item.icon : "",
    description: item ? item.description : "",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const getIconsLabel = () => {
  return iconsList.map(icon => {
    const TagIcon = categoriesIcons[icon.value];

    return {
      label: (
        <div className="icon_container">
          <label className="icon">{<TagIcon />}</label>
          <label className="label">{icon.label}</label>
        </div>
      ),
      value: icon.value,
    };
  });
};

const CategoryCreateEdit = ({ item, ...props }) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const dataTableContext = useContext(DataTableContext);

  const [requestSend, setRequestSend] = useState(null);
  const icons = useState(getIconsLabel())[0];

  const httpClientHook = useHttpClient();
  const formHook = useForm(getFormSchema(t, item));

  const onSubmit = async data => {
    setRequestSend(true);
    const body = {
      name: data.name,
      icon: data.icon,
      description: data.description,
    };

    const url = item
      ? process.env.REACT_APP_BACKEND_URL + "/categories/" + item.id
      : process.env.REACT_APP_BACKEND_URL + "/categories";

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
          title={t("category_create_edit_form.alert_success_title")}
          description={t("category_create_edit_form.alert_success_description")}
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
                label={t("category_create_edit_form.input_name_label")}
                error={formHook?.formState?.errors?.name?.message}
                register={formHook.register}
              />
              {icons && (
                <Select
                  name="icon"
                  control={formHook.control}
                  options={icons}
                  label={t("category_create_edit_form.select_icon_label")}
                  placeholder={t("common.select_placeholder")}
                  error={formHook?.formState?.errors?.icon?.message}
                />
              )}
              <Input
                id="description"
                type="textarea"
                label={t("category_create_edit_form.input_description_label")}
                error={formHook?.formState?.errors?.description?.message}
                register={formHook.register}
              />
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

export default CategoryCreateEdit;
