/* eslint-disable import/prefer-default-export */
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Template from "../pages/templates";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/login";
import { PublicRoute } from "./PublicRoute";
import { Products } from "../pages/products";
import Integration from "../pages/integration";

export function Router(): JSX.Element {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/templates" element={<Template />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/integration/" element={<Integration />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
