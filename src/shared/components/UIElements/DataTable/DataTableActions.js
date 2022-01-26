import React, { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { DataTableContext } from "./DataTable";
import "./DataTableActions.css";

const DataTableActions = ({
  type,
  icon,
  content,
  item,
  className,
  modalHeader,
}) => {
  const dataTableContext = useContext(DataTableContext);
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = async () => {
    if (dataTableContext.shouldRefreshDataTable) {
      await dataTableContext.refreshTable();
    }
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onClick={closeModalHandler}>
        <Modal.Header onClick={closeModalHandler}>{modalHeader}</Modal.Header>
        <Modal.Main className={className}>
          {React.cloneElement(content, {
            item: item,
            closeModal: closeModalHandler,
          })}
        </Modal.Main>
      </Modal>
      <button
        onClick={openModalHandler}
        className={`data-table__button ${type}`}
      >
        {icon}
      </button>
    </>
  );
};

export default DataTableActions;
