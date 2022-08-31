//external lib imports
import React, { Suspense, lazy } from "react";

//Internal Lib Import
import LazyLoader from "../../../components/Common/LazyLoader";
const AppNavigation = lazy(() =>
  import("../../../components/AppNavigation/AppNavigation"),
);
const RegistrationUser = lazy(() =>
  import("../../../components/Auth/RegisterUser/RegisterUser"),
);

const RegistrationPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <AppNavigation title="Registration Page" />
      <RegistrationUser />
    </Suspense>
  );
};

export default RegistrationPage;
