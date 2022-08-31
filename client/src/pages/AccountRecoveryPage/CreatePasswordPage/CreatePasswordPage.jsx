//External Lib Import
import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../../components/Common/LazyLoader";
const CreatePassword = lazy(() =>
  import("../../../components/AccountRecovery/CreatePassword"),
);
const AppNavigation = lazy(() =>
  import("../../../components/AppNavigation/AppNavigation"),
);

const CreatePasswordPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <AppNavigation title="Create Password Page" />
        <CreatePassword />
      </Suspense>
    </>
  );
};

export default CreatePasswordPage;
