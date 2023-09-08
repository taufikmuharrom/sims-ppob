import axios from "axios";
// import authHeader from '../../Helper/auth-header'
const axiosInstance = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app/",
});

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};

// AUTHENTICATION
const registrationApi = (payloads) => {
  return axiosInstance.post("registration", payloads).then((response) => {
    console.log("registration", response);
    return response;
  });
};

const loginApi = (payloads) => {
  return axiosInstance.post("login", payloads).then((response) => {
    console.log("login", response);
    return response;
  });
};

export { registrationApi, loginApi };

// const AVAILABILITY = '/expert/schedule-setting/'

// const getAvailability = (customerId) => {
//     return axiosInstance
//         .get(AVAILABILITY + `${customerId}/available`, {
//             headers: authHeader()
//         })
//         .then((response) => {
//             return response.data
//         })
// }

// const setAvailability = (customerId,payloads) => {
//     return axiosInstance
//         .patch(AVAILABILITY + `${customerId}/update`,payloads, {
//             headers: authHeader()
//         })
//         .then((response) => {
//             return response.data
//         })
// }

// const availabilityService = {
//     getAvailability,
//     setAvailability
// }
// export default availabilityService
