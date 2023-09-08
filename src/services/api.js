import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app/",
});

const getToken = localStorage.getItem("token");
const setJwtHeader = getToken ? { Authorization: "Bearer " + getToken } : null;

// MEMBERSHIP
const registrationApi = (payloads) => {
  return axiosInstance.post("registration", payloads).then((response) => {
    return response;
  });
};

const loginApi = (payloads) => {
  return axiosInstance.post("login", payloads).then((response) => {
    return response;
  });
};

const getProfileApi = () => {
  return axiosInstance
    .get("profile", {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

// TRANSACTION
const historyApi = () => {
  return axiosInstance
    .get("transaction/history", {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

const balanceApi = () => {
  return axiosInstance
    .get("balance", {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

const paymentApi = (payloads) => {
  return axiosInstance
    .post("transaction", payloads, {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

const topUpApi = (payloads) => {
  return axiosInstance
    .post("topup", payloads, {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

// INFORMATION
const serviceApi = () => {
  return axiosInstance
    .get("services", {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

const bannerApi = () => {
  return axiosInstance
    .get("banner", {
      headers: setJwtHeader,
    })
    .then((response) => {
      return response;
    });
};

export {
  registrationApi,
  loginApi,
  getProfileApi,
  balanceApi,
  serviceApi,
  bannerApi,
  paymentApi,
  historyApi,
  topUpApi,
};
