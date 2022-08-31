//External Lib Import
import React, { lazy, Suspense } from "react";

//Internal Lib Import
import LazyLoader from "../../../components/Common/LazyLoader";
const AppNavigation = lazy(() =>
  import("../../../components/AppNavigation/AppNavigation"),
);
const VerifyOtp = lazy(() =>
  import("../../../components/AccountRecovery/VerifyOtp"),
);

const VerifyOptPage = () => {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <AppNavigation title="Verify Otp Page" />
        <VerifyOtp />
      </Suspense>
    </>
  );
};

export default VerifyOptPage;
