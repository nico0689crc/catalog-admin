import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-contex";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/UIElements/DataTable/DataTable";
import Layout from "../../../shared/components/Dashboard/Layout/Layout";
import NewEntityButton from "../../../shared/containers/NewEntityButton";
import ProductView from "./ProductView/ProductView";
import ProductDelete from "./ProductDelete/ProductDelete";
import ProductCreateEdit from "./ProductCreateEdit/ProductCreateEdit";
import "./Products.css";

const getColumns = (permissions, t) => {
  const columns = [
    {
      name: t("products.data_table_columns.name"),
      selector: row => row.name,
    },
    {
      name: t("products.data_table_columns.description"),
      selector: row => row.description,
      style: {
        width: "40%",
        maxWidth: "50px",
      },
    },
    {
      name: t("products.data_table_columns.quantity"),
      selector: row => row.quantity,
    },
    {
      name: t("products.data_table_columns.price"),
      selector: row => row.price,
    },
    {
      name: t("products.data_table_columns.actions"),
      showActions: {},
    },
  ];

  if (permissions.get.others) {
    columns[4]["showActions"]["view"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("product_view_form.modal_header_title")}
        </h1>
      ),
      component: <ProductView />,
    };
  }

  if (permissions.update.others) {
    columns[4]["showActions"]["edit"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("product_create_edit_form.edit_modal_header_title")}
        </h1>
      ),
      component: <ProductCreateEdit />,
    };
  }

  if (permissions.delete.others) {
    columns[4]["showActions"]["delete"] = {
      modalHeader: (
        <h2 className="modal__header--title">
          {t("product_delete_form.modal_header_title")}
        </h2>
      ),
      component: <ProductDelete />,
      className: "modal-delete-size",
    };
  }

  return columns;
};

const getProducts = (data, included) => {
  const products = data.map(product => {
    let category_name = "";
    let creator_name = "";
    const tags = [];

    included.map(includedItem => {
      if (
        includedItem.type === product.relationships.categories.data.type &&
        includedItem.id === product.relationships.categories.data.id
      ) {
        category_name = includedItem.attributes.name;
      }

      if (
        includedItem.type === product.relationships.creators.data.type &&
        includedItem.id === product.relationships.creators.data.id
      ) {
        creator_name = includedItem.attributes.name;
      }

      product.relationships.tags.data.map(tag => {
        if (includedItem.type === tag.type && includedItem.id === tag.id) {
          tags.push({
            name: includedItem.attributes.name,
            id: includedItem.id,
          });
        }
        return null;
      });
      return null;
    });

    return {
      id: product.id,
      name: product.attributes.name,
      description: product.attributes.description,
      quantity: product.attributes.quantity,
      price: product.attributes.price,
      category_name: category_name,
      category_id: product.relationships.categories.data.id,
      creator_name: creator_name,
      tags: tags,
      images: product.attributes.images,
    };
  });

  return products;
};

const Products = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const columns = getColumns(auth.attributes.permissions.products, t);
  const url = `${process.env.REACT_APP_BACKEND_URL}/products`;

  const onSuccessFetching = responseData => {
    const { data, api, included } = responseData;
    const products = getProducts(data, included);
    const totalItems = api.items_total;
    return { items: products, totalItems };
  };

  return (
    <Layout>
      <h1>{t("content.sidebar.products")}</h1>
      <div className="products-container">
        <DataTable
          columns={columns}
          onSuccessFetching={onSuccessFetching}
          url={url}
          queries="include=categories,tags,creators"
          extraOptions={
            auth.attributes.permissions.products.create.others && (
              <NewEntityButton
                modalHeaderTitle={t(
                  "product_create_edit_form.create_modal_header_title"
                )}
                buttonText={t("products.product_new_button")}
              >
                <ProductCreateEdit />
              </NewEntityButton>
            )
          }
          texts={{
            page_size: t("common.data_table.page_size"),
            loading: t("common.data_table.loading"),
          }}
        />
      </div>
    </Layout>
  );
};

export default Products;
