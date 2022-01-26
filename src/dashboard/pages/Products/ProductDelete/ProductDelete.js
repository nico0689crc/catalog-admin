import { useTranslation } from "react-i18next";
import DeleteEntityContainer from "../../../../shared/containers/DeleteEntityContainer/DeleteEntityContainer";

const ProductDelete = ({ item, closeModal }) => {
  const { t } = useTranslation();
  const texts = {
    alert_succees_title: t("product_delete_form.alert_success_title"),
    alert_succees_description: t(
      "product_delete_form.alert_success_description"
    ),
    modal_message: t("product_delete_form.message"),
  };
  const url = process.env.REACT_APP_BACKEND_URL + "/products/" + item.id;

  return (
    <DeleteEntityContainer
      item={item}
      closeModal={closeModal}
      texts={texts}
      url={url}
    />
  );
};

export default ProductDelete;
