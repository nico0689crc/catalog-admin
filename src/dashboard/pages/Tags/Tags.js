import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-contex";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/UIElements/DataTable/DataTable";
import Layout from "../../../shared/components/Dashboard/Layout/Layout";
import NewEntityButton from "../../../shared/containers/NewEntityButton";
import TagCreateEdit from "./TagCreateEdit/TagCreateEdit";
import TagDelete from "./TagDelete/TagDelete";
import TagView from "./TagView/TagView";

const getColumns = (permissions, t) => {
  const columns = [
    {
      name: t("tags.data_table_columns.name"),
      selector: row => row.name,
    },
    {
      name: t("tags.data_table_columns.products_count"),
      selector: row => row.products.length,
    },
    {
      name: t("tags.data_table_columns.actions"),
      showActions: {},
    },
  ];

  if (permissions.get.others) {
    columns[2]["showActions"]["view"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("tag_view_form.modal_header_title")}
        </h1>
      ),
      component: <TagView />,
    };
  }

  if (permissions.update.others) {
    columns[2]["showActions"]["edit"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("tag_create_edit_form.edit_modal_header_title")}
        </h1>
      ),
      component: <TagCreateEdit />,
    };
  }

  if (permissions.delete.others) {
    columns[2]["showActions"]["delete"] = {
      modalHeader: (
        <h2 className="modal__header--title">
          {t("tag_delete_form.modal_header_title")}
        </h2>
      ),
      component: <TagDelete />,
      className: "modal-delete-size",
    };
  }

  return columns;
};

const getTags = (data, included) => {
  const tags = data.map(tag => {
    const products = [];
    let creator;

    included.map(includedItem => {
      if (
        includedItem.type === tag.relationships.creators.data.type &&
        includedItem.id === tag.relationships.creators.data.id
      ) {
        creator = { id: includedItem.id, ...includedItem.attributes };
      }

      tag.relationships.products.data.map(product => {
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
      id: tag.id,
      products,
      creator,
      ...tag.attributes,
    };
  });

  return tags;
};

const Tags = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const columns = getColumns(auth.attributes.permissions.tags, t);
  const url = `${process.env.REACT_APP_BACKEND_URL}/tags`;

  const onSuccessFetching = responseData => {
    const { data, api, included } = responseData;
    const tags = getTags(data, included);
    const totalItems = api.items_total;
    return { items: tags, totalItems };
  };
  return (
    <Layout>
      <h1>{t("content.sidebar.tags")}</h1>
      <div className="container">
        <DataTable
          columns={columns}
          onSuccessFetching={onSuccessFetching}
          url={url}
          queries="include=products,creators"
          extraOptions={
            auth.attributes.permissions.tags.create.others && (
              <NewEntityButton
                modalHeaderTitle={t(
                  "tag_create_edit_form.create_modal_header_title"
                )}
                buttonText={t("tags.tag_new_button")}
              >
                <TagCreateEdit />
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

export default Tags;
