import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../../FormElements/Button/Button";
import BackdropModal from "../BackdropModal/BackdropModal";
import "./Modal.css";

const Modal = props => {
  return (
    <>
      {props.show && <BackdropModal onClick={props.onClick} />}
      {props.show && (
        <div className={`modal ${props.className ? props.className : ""}`}>
          {props.children}
        </div>
      )}
    </>
  );
};

Modal.Header = function ModalHeader(props) {
  return (
    <header
      className={`modal__header ${props.className ? props.className : ""}`}
    >
      {props.children}
      <Button
        htmlType="submit"
        shape="circle"
        type="text"
        size="large"
        icon={<IoMdCloseCircleOutline />}
        onClick={props.onClick}
      />
    </header>
  );
};
Modal.Main = function ModalMain(props) {
  return (
    <main className={`modal__main ${props.className ? props.className : ""}`}>
      {props.children}
    </main>
  );
};
Modal.Footer = function ModalFooter(props) {
  return (
    <footer
      className={`modal__footer ${props.className ? props.className : ""}`}
    >
      {props.children}
    </footer>
  );
};

export default Modal;
