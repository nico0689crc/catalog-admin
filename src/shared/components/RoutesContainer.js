import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth-contex";
import Login from "../../authentication/pages/Login/Login";
import Register from "../../authentication/pages/Register/Register";
import ResetPasswordGet from "../../authentication/pages/ResetPassword/ResetPasswordGet";
import ResetPasswordPost from "../../authentication/pages/ResetPassword/ResetPasswordPost";
import AccountActivation from "../../authentication/pages/AccountActivation/AccountActivation";
import Products from "../../dashboard/pages/Products/Products";
import Categories from "../../dashboard/pages/Categories/Categories";
import Tags from "../../dashboard/pages/Tags/Tags";
import Users from "../../dashboard/pages/Users/Users";
import Settings from "../../dashboard/pages/Settings/Settings";

const RoutesContainer = () => {
  const auth = useContext(AuthContext);
  const { token } = auth;
  let routes = null;

  if (token) {
    routes = (
      <Routes>
        <Route path="/login" element={<Navigate replace to="/products" />} />
        <Route path="/" element={<Navigate replace to="/products" />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/products" element={<Navigate replace to="/login" />} />
        <Route path="/categories" element={<Navigate replace to="/login" />} />
        <Route path="/tags" element={<Navigate replace to="/login" />} />
        <Route path="/users" element={<Navigate replace to="/login" />} />
        <Route path="/settings" element={<Navigate replace to="/login" />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password-get" element={<ResetPasswordGet />} />
        <Route path="/reset-password-post" element={<ResetPasswordPost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-activation" element={<AccountActivation />} />
      </Routes>
    );
  }

  return routes;
};

export default RoutesContainer;
