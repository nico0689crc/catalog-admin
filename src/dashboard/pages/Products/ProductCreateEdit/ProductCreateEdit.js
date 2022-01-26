import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../shared/context/auth-contex";
import { DataTableContext } from "../../../../shared/components/UIElements/DataTable/DataTable";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { useHttpClient } from "../../../../shared/hooks/http-hook";

import Input from "../../../../shared/components/FormElements/Input/Input";
import ImageUploader from "../../../../shared/components/UIElements/ImageUploader/ImageUploader";
import Button from "../../../../shared/components/FormElements/Button/Button";
import Divider from "../../../../shared/components/UIElements/Divider/Divider";
import ProductAlertError from "../../../../shared/containers/EntityAlert/EntityAlertError";
import ProductAlertSuccess from "../../../../shared/containers/EntityAlert/EntityAlertSuccess";
import Select from "../../../../shared/components/FormElements/Select/Select";
import "./ProductCreateEdit.css";

const getFormSchema = (t, item) => {
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required(t("validations.field_required"))
      .min(10, t("validations.min_length_10")),
    categories: yup.string().ensure().required(t("validations.field_required")),
    quantity: yup
      .number()
      .typeError(t("validations.numeric_field"))
      .positive(t("validations.positive_field")),
    price: yup
      .number()
      .typeError(t("validations.numeric_field"))
      .positive(t("validations.positive_field")),
    description: yup
      .string()
      .required(t("validations.field_required"))
      .min(30, t("validations.min_length_30")),
  });

  const defaultValues = {
    name: item ? item.name : "",
    quantity: item ? item.quantity : "",
    price: item ? item.price : "",
    categories: item ? item.category_id : "",
    tags: item
      ? item.tags.map(tag => {
          return { value: tag.id, label: tag.name };
        })
      : [],
    description: item ? item.description : "",
  };

  return {
    defaultValues,
    resolver: yupResolver(formSchema),
  };
};

const ProductCreateEdit = ({ item, ...props }) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const dataTableContext = useContext(DataTableContext);

  const [requestSend, setRequestSend] = useState(null);
  const [tags, setTags] = useState(null);
  const [categories, setCategories] = useState(null);
  const [imagesForm, setImagesForm] = useState([]);
  const [currentImages, setCurrentImages] = useState([]);

  const httpClientHook = useHttpClient();
  const formHook = useForm(getFormSchema(t, item));

  const onSubmit = async data => {
    setRequestSend(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("categories", data.categories);
    formData.append(
      "tags",
      data.tags.map(tag => tag.value)
    );
    formData.append("description", data.description);

    for (let i = 0; i < imagesForm.length; i++) {
      formData.append("images", imagesForm[i]);
    }

    const url = item
      ? process.env.REACT_APP_BACKEND_URL + "/products/" + item.id
      : process.env.REACT_APP_BACKEND_URL + "/products";

    for (let i = 0; i < currentImages.length; i++) {
      formData.append("currentImages", currentImages[i]._id);
    }

    await httpClientHook.sendRequest(url, item ? "PATCH" : "POST", formData, {
      Authorization: "Barrer " + auth.token,
    });

    dataTableContext.setShouldRefreshDataTable(true);
  };

  useEffect(() => {
    const fetchTags = async () => {
      await httpClientHook
        .sendRequest(`${process.env.REACT_APP_BACKEND_URL}/tags`, "GET", null)
        .then(responseData => {
          const { data } = responseData;
          const tags = data.map(item => {
            return {
              value: item.id,
              label: item.attributes.name,
            };
          });

          setTags(tags);
        });
    };

    const fetchCategories = async () => {
      await httpClientHook
        .sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/categories`,
          "GET",
          null
        )
        .then(responseData => {
          const { data } = responseData;
          const catagories = data.map(item => {
            return {
              value: item.id,
              label: item.attributes.name,
            };
          });
          setCategories(catagories);
        });
    };

    fetchTags();
    fetchCategories();

    return () => {
      setCategories(null);
      setTags(null);
    };
  });

  useEffect(() => {
    item && setCurrentImages(item.images);
  }, [item]);

  return (
    <div className="entity-new">
      {!httpClientHook.error && requestSend && !httpClientHook.isLoading ? (
        <ProductAlertSuccess
          title={t("product_create_edit_form.alert_success_title")}
          description={t("product_create_edit_form.alert_success_description")}
          buttonText={t("common.button_close_modal")}
          closeModal={props.closeModal}
        />
      ) : (
        <form onSubmit={formHook.handleSubmit(onSubmit)}>
          <ProductAlertError
            errorsHttpRequest={httpClientHook.error}
            clearError={httpClientHook.clearError}
          />
          <div className="row">
            <div className="column">
              <Input
                id="name"
                type="text"
                label={t("product_create_edit_form.input_name_label")}
                error={formHook?.formState?.errors?.name?.message}
                register={formHook.register}
              />
              <Input
                id="quantity"
                type="text"
                label={t("product_create_edit_form.input_quantity_label")}
                error={formHook?.formState?.errors?.quantity?.message}
                register={formHook.register}
              />
              <Input
                id="price"
                type="text"
                label={t("product_create_edit_form.input_price_label")}
                error={formHook?.formState?.errors?.price?.message}
                register={formHook.register}
              />
              {categories && (
                <Select
                  name="categories"
                  control={formHook.control}
                  options={categories}
                  label={t("product_create_edit_form.select_catagories_label")}
                  placeholder={t("common.select_placeholder")}
                  error={formHook?.formState?.errors?.categories?.message}
                />
              )}
              {tags && (
                <Select
                  name="tags"
                  control={formHook.control}
                  options={tags}
                  placeholder={t("common.select_placeholder")}
                  label={t("product_create_edit_form.select_tags_label")}
                  isMulti
                />
              )}
              <Input
                id="description"
                type="textarea"
                label={t("product_create_edit_form.input_description_label")}
                error={formHook?.formState?.errors?.description?.message}
                register={formHook.register}
              />
            </div>
            <div className="column">
              <ImageUploader
                setImagesForm={setImagesForm}
                currentImages={currentImages}
                setCurrentImages={setCurrentImages}
                id="images"
                name="images"
                texts={{
                  file_button: t("common.image_uploader_file_button"),
                  empty_files: t("common.image_uploader_empty_files"),
                  divider_new_images: t(
                    "common.image_uploader_divider_new_images"
                  ),
                  divider_current_images: t(
                    "common.image_uploader_divider_current_images"
                  ),
                }}
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
              loading={httpClientHook.isLoading && tags && categories}
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

export default ProductCreateEdit;
