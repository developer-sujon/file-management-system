//external lib import
import axios from "axios";
import SessionHelper from "../helper/SessionHelper";
import ToastMessage from "../helper/ToastMessage";
import { removeLoading, setLoading } from "../redux/features/loaderSlice";
import { SetProfile } from "../redux/features/profileSlice";

import store from "../redux/store/store";

function configHeaders() {
  // I tested all these below 3 lines , no on worked
  axios.defaults.baseURL = "/api/v1";
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + SessionHelper.getToken();
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
}
configHeaders();

class ApiRequest {
  static RegistrationUserRequest({ name, userName, email, phone, password }) {
    configHeaders();
    return axios
      .post("/user/registrationUser", {
        name,
        userName,
        email,
        phone,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          return true;
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }
  static LoginUserRequest({ email, phone, password }) {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .post("/user/loginUser", {
        email,
        phone,
        password,
      })
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          SessionHelper.setToken(response.data.accessToken);
          return true;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        if (err.response.status === 404) {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        } else if (err.response.status === 401) {
          ToastMessage.errorMessage(err.response.data.message);
          SessionHelper.removeToken("accessToken");
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }
  static ProfileSelectRequest() {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .get("/user/selectUser")
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          store.dispatch(SetProfile(response.data[0]));
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        if (err.response.status === 401) {
          ToastMessage.errorMessage(err.response.data.message);
          SessionHelper.removeToken("accessToken");
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }
  static ProfileUpdateRequest(name, phone, photo, email) {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .patch("/user/updateUser", { name, phone, photo, email })
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          ToastMessage.successMessage("Profile Update Success");
          return true;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        if (err.response.status === 401) {
          ToastMessage.errorMessage(err.response.data.message);
          SessionHelper.removeToken("accessToken");
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }
  static ChangePasswordRequest(previousPassword, newPassword, email) {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .put("/user/changePassword", { previousPassword, newPassword, email })
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          ToastMessage.successMessage("Password Change Success");
          return true;
        }
      })
      .catch((err) => {
        store.dispatch(removeLoading());
        if (err.response.status === 401) {
          ToastMessage.errorMessage(err.response.data.message);
          SessionHelper.removeToken("accessToken");
          window.location.href = "/login";
          return false;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return false;
        }
      });
  }
  static SendOpt(email) {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .get("/user/sendOpt/" + email)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 201) {
          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(removeLoading());
        if (err.response.status === 404) {
          ToastMessage.errorMessage(err.response.data.message);
          return null;
        } else {
          ToastMessage.errorMessage(err.response.data.message);
          return null;
        }
      });
  }
  static VerifyOtpCode(email, otp) {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .get("/user/verifyOtp/" + email + "/" + otp)
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(removeLoading());
        ToastMessage.errorMessage(err.response.data.message);
        return null;
      });
  }
  static PasswordRecovery(email, otp, password) {
    configHeaders();
    store.dispatch(setLoading());
    return axios
      .post("/user/passwordRecovery", { email, otp, password })
      .then((response) => {
        store.dispatch(removeLoading());
        if (response.status === 200) {
          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(removeLoading());
        ToastMessage.errorMessage(err.response.data.message);
        return null;
      });
  }
}

export default ApiRequest;
