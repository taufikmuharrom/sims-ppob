const parseJwt = (token) => {
  if (!token) return null;
  var base64Url = token?.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const tokenValidator = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;
  const tokenExpiredAt = parseJwt(token).exp;
  const isAlreadyExpired =
    new Date().getTime() > new Date(tokenExpiredAt * 1000).getTime();
  return isAlreadyExpired;
};

export default tokenValidator;
