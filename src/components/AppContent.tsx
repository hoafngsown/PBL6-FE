import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// routes config
import routes from "@/routes";

const AppContent = () => {

  return (
    <Suspense>
      <Routes>
        {routes.map((route: any, idx) => <Route key={idx} path={route.path} element={<route.element />} />
        )}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default React.memo(AppContent);
