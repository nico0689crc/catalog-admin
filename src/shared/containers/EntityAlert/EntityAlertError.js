import Alert from "../../components/UIElements/Alert/Alert";

const ProductAlertError = ({ errorsHttpRequest, clearError }) => {
  return (
    <>
      {errorsHttpRequest &&
        errorsHttpRequest.errors &&
        Array.isArray(errorsHttpRequest.errors) &&
        errorsHttpRequest.errors.map((error, index) => (
          <Alert
            key={index}
            title={error.title}
            description={error.detail}
            type="error"
            showIcon
            closeable
            onClick={clearError}
          />
        ))}

      {errorsHttpRequest &&
        errorsHttpRequest.errors &&
        !Array.isArray(errorsHttpRequest.errors) && (
          <Alert
            description={errorsHttpRequest.errors}
            type="error"
            showIcon
            closeable
            onClick={clearError}
          />
        )}
    </>
  );
};

export default ProductAlertError;
