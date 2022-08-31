//External lib imports
import React, { Suspense, lazy } from "react";

//Internal lib imports
import LazyLoader from "../../../components/Common/LazyLoader";

const MasterLayout = lazy(() =>
  import("../../../components/MasterLayout/MasterLayout"),
);
const Profile = lazy(() => import("../../../components/User/Profile/Profile"));

const ProfilePage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <MasterLayout title="Profile Page">
        <Profile />
      </MasterLayout>
    </Suspense>
  );
};

export default ProfilePage;
