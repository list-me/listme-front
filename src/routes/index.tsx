import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Template} from "../pages/templates";
import PrivateRoutes from "./PrivateRoutes";
import {Login} from "../pages/login";
import {PublicRoute} from "./PublicRoute";
import Table from "../components/CustomTable";

export const Router = () => (
    <Suspense>
        <Routes>
            <Route path="/" element={<PublicRoute />} >
                <Route path="/" element={<Login />} />
            </Route>
            <Route path="/" element={<PrivateRoutes />}>
                <Route path="/templates" element={<Template />} />
            </Route>
        </Routes>
    </Suspense>
);
