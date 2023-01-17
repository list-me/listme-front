import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {Template} from "../pages/templates";

export const Router = () => (
    <Suspense>
        <Routes>
            <Route path="/" element={<Template />} />
        </Routes>
    </Suspense>
);
