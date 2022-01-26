import { useTranslation } from "react-i18next";
import ViewEntityContainer from "../../../../shared/containers/ViewEntityContainer/ViewEntityContainer";
import Carousel from "../../../../shared/components/UIElements/Carousel/Carousel";

const ProductView = ({ item }) => {
  const { t } = useTranslation();
  const images =
    item.images &&
    item.images
      .filter(image => image.original && image.original.active)
      .map(image => image.original.url);

  return (
    <ViewEntityContainer large>
      <ViewEntityContainer.Column size="half">
        <ViewEntityContainer.Item
          label={`${t("product_view_form.product_id")}: `}
          content={item.id}
        />
        <ViewEntityContainer.Item
          label={`${t("product_view_form.name_label")}: `}
          content={item.name}
        />
        <ViewEntityContainer.Item
          label={`${t("product_view_form.quantity_label")}: `}
          content={item.quantity}
        />
        <ViewEntityContainer.Item
          label={`${t("product_view_form.price_label")}: `}
          content={`$${item.price}`}
        />
        <ViewEntityContainer.Item
          label={`${t("product_view_form.category_label")}: `}
          content={item.category_name}
        />
        <ViewEntityContainer.Item
          label={`${t("product_view_form.creator_label")}: `}
          content={item.creator_name}
        />
        <ViewEntityContainer.Item
          label={`${t("product_view_form.tags_label")}: `}
          content={item.tags.map((tag, index) => (
            <span
              key={index}
              className="product-view__content product-view__content--tags"
            >
              {tag.name}
            </span>
          ))}
        />
        <ViewEntityContainer.Item
          flexDirection="flex-column"
          label={`${t("product_view_form.description_label")}: `}
          content={item.description}
        />
      </ViewEntityContainer.Column>
      <ViewEntityContainer.Column size="half">
        <ViewEntityContainer.Item
          style={{
            width: "400px",
            height: "400px",
          }}
          content={<Carousel items={images} />}
        />
      </ViewEntityContainer.Column>
    </ViewEntityContainer>
  );
};

export default ProductView;
