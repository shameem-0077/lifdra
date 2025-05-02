import React from "react";
import { childrenToReact } from "react-markdown/lib/ast-to-react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";
import auth from "./auth";

export default function ChildrenPrivateRoute({  children }) {
  
  const location = useLocation();

  return auth.isAuthenticated() ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: "/",
        search: `?action=login&next=${location.pathname}${location.search}`,
      }}
    />
  );
}
