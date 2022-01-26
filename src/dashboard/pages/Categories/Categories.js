import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-contex";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/UIElements/DataTable/DataTable";
import Layout from "../../../shared/components/Dashboard/Layout/Layout";
import NewEntityButton from "../../../shared/containers/NewEntityButton";
import CategoryCreateEdit from "./CategoryCreateEdit/CategoryCreateEdit";
import CategoryDelete from "./CategoryDelete/CategoryDelete";
import CategoryView from "./CategoryView/CategoryView";
import IconTag from "../../../shared/components/UIElements/Icons/IconTag/IconTag";

const getColumns = (permissions, t) => {
  const columns = [
    {
      name: t("categories.data_table_columns.icon"),
      selector: row => (row.icon ? <IconTag iconName={row.icon} /> : null),
    },
    {
      name: t("categories.data_table_columns.name"),
      selector: row => row.name,
    },
    {
      name: t("categories.data_table_columns.description"),
      selector: row => row.description,
      style: {
        width: "40%",
        maxWidth: "50px",
      },
    },
    {
      name: t("categories.data_table_columns.products_count"),
      selector: row => row.products.length,
    },
    {
      name: t("categories.data_table_columns.actions"),
      showActions: {},
    },
  ];

  if (permissions.get.others) {
    columns[4]["showActions"]["view"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("category_view_form.modal_header_title")}
        </h1>
      ),
      component: <CategoryView />,
    };
  }

  if (permissions.update.others) {
    columns[4]["showActions"]["edit"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("category_create_edit_form.edit_modal_header_title")}
        </h1>
      ),
      component: <CategoryCreateEdit />,
    };
  }

  if (permissions.delete.others) {
    columns[4]["showActions"]["delete"] = {
      modalHeader: (
        <h2 className="modal__header--title">
          {t("category_delete_form.modal_header_title")}
        </h2>
      ),
      component: <CategoryDelete />,
      className: "modal-delete-size",
    };
  }

  return columns;
};

const getCategories = (data, included) => {
  const categories = data.map(category => {
    const products = [];
    let creator;

    included.map(includedItem => {
      if (
        includedItem.type === category.relationships.creators.data.type &&
        includedItem.id === category.relationships.creators.data.id
      ) {
        creator = { id: includedItem.id, ...includedItem.attributes };
      }

      category.relationships.products.data.map(product => {
        if (
          includedItem.type === product.type &&
          includedItem.id === product.id
        ) {
          products.push({
            id: includedItem.id,
            ...includedItem.attributes,
          });
        }
        return null;
      });
      return null;
    });

    return {
      id: category.id,
      products,
      creator,
      ...category.attributes,
    };
  });

  return categories;
};

const Categories = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const columns = getColumns(auth.attributes.permissions.categories, t);
  const url = `${process.env.REACT_APP_BACKEND_URL}/categories`;

  const onSuccessFetching = responseData => {
    const { data, api, included } = responseData;
    const categories = getCategories(data, included);
    const totalItems = api.items_total;
    return { items: categories, totalItems };
  };
  return (
    <Layout>
      <h1>{t("content.sidebar.categories")}</h1>
      <div className="categories-container">
        <DataTable
          columns={columns}
          onSuccessFetching={onSuccessFetching}
          url={url}
          queries="include=products,creators"
          extraOptions={
            auth.attributes.permissions.categories.create.others && (
              <NewEntityButton
                modalHeaderTitle={t(
                  "category_create_edit_form.create_modal_header_title"
                )}
                buttonText={t("categories.category_new_button")}
              >
                <CategoryCreateEdit />
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

export default Categories;
