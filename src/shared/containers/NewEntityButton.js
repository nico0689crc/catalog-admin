import { useContext, useState, cloneElement } from "react";
import { BsPlusCircle } from "react-icons/bs";

import Modal from "../components/UIElements/Modal/Modal";
import Button from "../components/FormElements/Button/Button";
import { DataTableContext } from "../components/UIElements/DataTable/DataTable";

const NewEntityButton = ({ children, buttonText, modalHeaderTitle }) => {
  const dataTableContext = useContext(DataTableContext);
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    if (dataTableContext.shouldRefreshDataTable) {
      dataTableContext.refreshTable();
    }
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onClick={closeModalHandler}>
        <Modal.Header onClick={closeModalHandler}>
          <h1 style={{ width: "100%", textAlign: "center" }}>
            {modalHeaderTitle}
          </h1>
        </Modal.Header>
        <Modal.Main>
          {cloneElement(children, {
            closeModal: closeModalHandler,
          })}
        </Modal.Main>
      </Modal>
      <Button
        type="primary"
        text={buttonText}
        shape="round"
        icon={<BsPlusCircle />}
        onClick={openModalHandler}
      />
    </>
  );
};

export default NewEntityButton;
