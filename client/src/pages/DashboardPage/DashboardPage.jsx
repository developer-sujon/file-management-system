//External lib imports
import React, { lazy, Suspense } from "react";

//Internal lib imports
import LazyLoader from "../../components/Common/LazyLoader";

const Dashboard = lazy(() => import("../../components/Dashboard/Dashboard"));
const MasterLayout = lazy(() =>
  import("../../components/MasterLayout/MasterLayout"),
);

const DashboardPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <MasterLayout title="Dashboard Page">
        <Dashboard />
      </MasterLayout>
    </Suspense>
  );
};

export default DashboardPage;
