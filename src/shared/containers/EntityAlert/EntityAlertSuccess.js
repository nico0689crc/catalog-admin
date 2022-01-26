import Alert from "../../components/UIElements/Alert/Alert";
import Button from "../../components/FormElements/Button/Button";

const EntityAlertSuccess = ({ title, description, buttonText, closeModal }) => {
  return (
    <>
      <Alert title={title} description={description} type="success" showIcon />
      <Button
        type="primary"
        htmlType="submit"
        text={buttonText}
        block
        shape="round"
        onClick={closeModal}
      />
    </>
  );
};

export default EntityAlertSuccess;
