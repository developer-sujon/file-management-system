//External lib imports
import React, { lazy, Suspense } from "react";

//Internal lib imports
import LazyLoader from "../../../components/Common/LazyLoader";
const MasterLayout = lazy(() =>
  import("../../../components/MasterLayout/MasterLayout"),
);
const Setting = lazy(() => import("../../../components/User/Setting/Setting"));

const SettingPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <MasterLayout title="Setting Page">
        <Setting />
      </MasterLayout>
    </Suspense>
  );
};

export default SettingPage;
