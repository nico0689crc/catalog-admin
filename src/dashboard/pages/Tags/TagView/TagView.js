import { useTranslation } from "react-i18next";
import ViewEntityContainer from "../../../../shared/containers/ViewEntityContainer/ViewEntityContainer";

const TagView = ({ item }) => {
  const { t } = useTranslation();
  return (
    <ViewEntityContainer>
      <ViewEntityContainer.Column size="full">
        <ViewEntityContainer.Item
          label={`${t("tag_view_form.tag_id")}: `}
          content={item.id}
        />
        <ViewEntityContainer.Item
          label={`${t("tag_view_form.name_label")}: `}
          content={item.name}
        />
        <ViewEntityContainer.Item
          label={`${t("tag_view_form.products_count_label")}: `}
          content={item.products.length}
        />
        <ViewEntityContainer.Item
          label={`${t("tag_view_form.creator_label")}: `}
          content={item.creator.name}
        />
      </ViewEntityContainer.Column>
    </ViewEntityContainer>
  );
};

export default TagView;
