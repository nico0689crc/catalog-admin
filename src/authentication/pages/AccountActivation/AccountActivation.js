import { useEffect, useState } from "react";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Divider from "../../../shared/components/UIElements/Divider/Divider";
import AuthPanel from "../../components/AuthPanel/AuthPanel";
import Alert from "../../../shared/components/UIElements/Alert/Alert";
import Links from "../../../shared/components/FormElements/Links/Links";
import { useSearchParams } from "react-router-dom";

const AccountActivation = () => {
  const [requestSend, setRequestSend] = useState(null);
  const searchParams = useSearchParams()[0];
  const confirmationCode = searchParams.get("confirmationCode");
  const userId = searchParams.get("userId");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const sendVerificationCode = async () => {
      setRequestSend(true);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/verify-email-account",
        "POST",
        JSON.stringify({
          confirmationCode,
          userId,
        }),
        { "Content-Type": "application/json" }
      );
    };

    sendVerificationCode();
  }, [confirmationCode, sendRequest, userId]);

  return (
    <>
      <AuthPanel>
        <AuthPanel.Header />
        <Divider text="Account Activation" size="small" />
        <AuthPanel.Content>
          {!error && requestSend && !isLoading ? (
            <Alert
              title="Your account has been activated."
              description="Please go to the login form to access your account."
              type="success"
              showIcon
            />
          ) : (
            error?.errors.map((error, index) => (
              <Alert
                key={index}
                title={error.title}
                description={error.detail}
                type="error"
                showIcon
                closeable
                onClick={clearError}
              />
            ))
          )}
        </AuthPanel.Content>
        <Divider size="medium" />
        <AuthPanel.Footer>
          <Links type="primary" text="Login" to={`/login`} />
        </AuthPanel.Footer>
      </AuthPanel>
    </>
  );
};

export default AccountActivation;
