import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/auth-contex";
import { DataTableContext } from "../../components/UIElements/DataTable/DataTable";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Divider from "../../components/UIElements/Divider/Divider";
import Button from "../../components/FormElements/Button/Button";
import EntityAlertError from "../EntityAlert/EntityAlertError";
import EntityAlertSuccess from "../EntityAlert/EntityAlertSuccess";
import "./DeleteEntityContainer.css";

const DeleteEntityContainer = ({ item, closeModal, texts, url }) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const dataTableContext = useContext(DataTableContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [requestSend, setRequestSend] = useState(null);

  const onDeleteHandler = async () => {
    setRequestSend(true);
    await sendRequest(url, "DELETE", null, {
      Authorization: "Barrer " + auth.token,
    });

    dataTableContext.setShouldRefreshDataTable(true);
  };

  return (
    <div className="entity-delete">
      {!error && requestSend && !isLoading ? (
        <EntityAlertSuccess
          title={texts.alert_succees_title}
          description={texts.alert_succees_description}
          buttonText={t("common.button_close_modal")}
          closeModal={closeModal}
        />
      ) : (
        <>
          <div className="message-container">
            <EntityAlertError
              errorsHttpRequest={error}
              clearError={clearError}
            />
            <p>
              {texts.modal_message}
              <span className="message_name">{item.name ? item.name : ""}</span>
              ?
            </p>
          </div>
          <Divider />
          <div className="actions-container">
            <Button
              text={t("common.button_cancel_modal")}
              shape="round"
              htmlType="button"
              type="default"
              className=""
              onClick={closeModal}
            />
            <Button
              text={t("common.button_delete_modal")}
              shape="round"
              htmlType="button"
              type="primary"
              loading={isLoading}
              loadingText={t("common.button_loading_text")}
              onClick={onDeleteHandler}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteEntityContainer;
