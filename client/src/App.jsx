//external lib imports
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//internal lib imports
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProfilePage from "./pages/UserPage/ProfilePage/ProfilePage";
import SettingPage from "./pages/UserPage/SettingPage/SettingPage";
import FullScreenLoader from "./components/Common/FullScreenLoader";
import CreatePasswordPage from "./pages/AccountRecoveryPage/CreatePasswordPage/CreatePasswordPage";
import SendOptPage from "./pages/AccountRecoveryPage/SendOptPage/SendOptPage";
import VerifyOptPage from "./pages/AccountRecoveryPage/VerifyOptPage/VerifyOptPage";
import LoginPage from "./pages/AuthPage/LoginPage/LoginPage";
import RegistrationPage from "./pages/AuthPage/RegistrationPage/RegistrationPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/send-otp" element={<SendOptPage />} />
          <Route path="/verify-otp" element={<VerifyOptPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-password" element={<CreatePasswordPage />} />
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </>
  );
};

export default App;
