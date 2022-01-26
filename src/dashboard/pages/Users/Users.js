import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-contex";
import { useTranslation } from "react-i18next";
import DataTable from "../../../shared/components/UIElements/DataTable/DataTable";
import Layout from "../../../shared/components/Dashboard/Layout/Layout";
import NewEntityButton from "../../../shared/containers/NewEntityButton";
import UserCreateEdit from "./UserCreateEdit/UserCreateEdit";
import UserDelete from "./UserDelete/UserDelete";
import UserView from "./UserView/UserView";

const getColumns = (permissions, t) => {
  const columns = [
    {
      name: t("users.data_table_columns.avatar"),
      selector: row => row.avatar,
    },
    {
      name: t("users.data_table_columns.name"),
      selector: row => row.name,
    },
    {
      name: t("users.data_table_columns.email"),
      selector: row => row.email,
    },
    {
      name: t("users.data_table_columns.status"),
      selector: row => row.status,
    },
    {
      name: t("users.data_table_columns.role"),
      selector: row => row.role,
    },
    {
      name: t("users.data_table_columns.products_count"),
      selector: row => row.products.length,
    },
    {
      name: t("users.data_table_columns.actions"),
      showActions: {},
    },
  ];

  if (permissions.get.others) {
    columns[6]["showActions"]["view"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("user_view_form.modal_header_title")}
        </h1>
      ),
      component: <UserView />,
    };
  }

  if (permissions.update.others) {
    columns[6]["showActions"]["edit"] = {
      modalHeader: (
        <h1 className="modal__header--title">
          {t("user_create_edit_form.edit_modal_header_title")}
        </h1>
      ),
      component: <UserCreateEdit />,
    };
  }

  if (permissions.delete.others) {
    columns[6]["showActions"]["delete"] = {
      modalHeader: (
        <h2 className="modal__header--title">
          {t("user_delete_form.modal_header_title")}
        </h2>
      ),
      component: <UserDelete />,
      className: "modal-delete-size",
    };
  }

  return columns;
};

const getUsers = (data, included) => {
  const users = data.map(user => {
    const products = [];

    included.map(includedItem => {
      user.relationships.products.data.map(product => {
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
      id: user.id,
      products,

      ...user.attributes,
    };
  });

  return users;
};

const Users = () => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const columns = getColumns(auth.attributes.permissions.users, t);
  const url = `${process.env.REACT_APP_BACKEND_URL}/users`;

  const onSuccessFetching = responseData => {
    const { data, api, included } = responseData;
    const users = getUsers(data, included);
    const totalItems = api.items_total;
    return { items: users, totalItems };
  };
  return (
    <Layout>
      <h1>{t("content.sidebar.users")}</h1>
      <div className="container">
        <DataTable
          columns={columns}
          onSuccessFetching={onSuccessFetching}
          url={url}
          queries="include=products"
          extraOptions={
            auth.attributes.permissions.users.create.others && (
              <NewEntityButton
                modalHeaderTitle={t(
                  "user_create_edit_form.create_modal_header_title"
                )}
                buttonText={t("users.user_new_button")}
              >
                <UserCreateEdit />
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

export default Users;
