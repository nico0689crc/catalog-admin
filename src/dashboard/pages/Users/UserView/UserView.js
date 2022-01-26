import { useTranslation } from "react-i18next";
import ViewEntityContainer from "../../../../shared/containers/ViewEntityContainer/ViewEntityContainer";

const UserView = ({ item }) => {
  const { t } = useTranslation();
  return (
    <ViewEntityContainer>
      <ViewEntityContainer.Column size="full">
        <ViewEntityContainer.Item
          label={`${t("user_view_form.user_id")}: `}
          content={item.id}
        />
        <ViewEntityContainer.Item
          label={`${t("user_view_form.name_label")}: `}
          content={item.name}
        />
        <ViewEntityContainer.Item
          label={`${t("user_view_form.email_label")}: `}
          content={item.email}
        />
        <ViewEntityContainer.Item
          label={`${t("user_view_form.role_label")}: `}
          content={item.role}
        />
        <ViewEntityContainer.Item
          label={`${t("user_view_form.status_label")}: `}
          content={item.status}
        />
        <ViewEntityContainer.Item
          label={`${t("user_view_form.products_count_label")}: `}
          content={item.products.length}
        />
      </ViewEntityContainer.Column>
    </ViewEntityContainer>
  );
};

export default UserView;
