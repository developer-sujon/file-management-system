//External Lib Import
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../../components/Common/LazyLoader";

const AppNavigation = lazy(() =>
  import("../../../components/AppNavigation/AppNavigation"),
);
const LoginUser = lazy(() =>
  import("../../../components/Auth/LoginUser/LoginUser"),
);

const LoginPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Login Page" />
      <LoginUser />
    </Suspense>
  );
};

export default LoginPage;
