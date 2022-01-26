import { Suspense } from "react";
import { AuthContext } from "./shared/context/auth-contex";
import { useAuth } from "./shared/hooks/auth-hook";
import RoutesContainer from "./shared/components/RoutesContainer";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const App = () => {
  const { login, logout, userId, token, attributes } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        attributes: attributes,
        login: login,
        logout: logout,
      }}
    >
      <RoutesContainer />
    </AuthContext.Provider>
  );
};

const AppWrapped = () => {
  return (
    <Suspense fallback={<LoadingSpinner asOverlay />}>
      <App />
    </Suspense>
  );
};

export default AppWrapped;
