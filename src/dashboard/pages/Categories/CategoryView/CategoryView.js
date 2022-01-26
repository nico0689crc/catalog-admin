import { useTranslation } from "react-i18next";
import ViewEntityContainer from "../../../../shared/containers/ViewEntityContainer/ViewEntityContainer";
import IconTag from "../../../../shared/components/UIElements/Icons/IconTag/IconTag";

const CategoryView = ({ item }) => {
  const { t } = useTranslation();
  return (
    <ViewEntityContainer>
      <ViewEntityContainer.Column size="full">
        <ViewEntityContainer.Item
          label={`${t("category_view_form.icon_label")}: `}
          content={<IconTag iconName={item.icon} />}
        />
        <ViewEntityContainer.Item
          label={`${t("category_view_form.category_id")}: `}
          content={item.id}
        />
        <ViewEntityContainer.Item
          label={`${t("category_view_form.name_label")}: `}
          content={item.name}
        />
        <ViewEntityContainer.Item
          label={`${t("category_view_form.products_count_label")}: `}
          content={item.products.length}
        />
        <ViewEntityContainer.Item
          label={`${t("category_view_form.creator_label")}: `}
          content={item.creator.name}
        />
        <ViewEntityContainer.Item
          flexDirection="flex-column"
          label={`${t("category_view_form.description_label")}: `}
          content={item.description}
        />
      </ViewEntityContainer.Column>
    </ViewEntityContainer>
  );
};

export default CategoryView;
