import React from "react";

const appRoutes = [
  {
    path: "*",
    name: "NotFound",
    component: React.lazy(() => import("../pages/NotFound")),
  },
  {
    path: "/auth",
    name: "Auth",
    component: React.lazy(() => import("../pages/Auth")),
  },
  {
    path: "/",
    name: "Dashboard",
    component: React.lazy(() => import("../pages/Dashboard")),
  },
  {
    path: "/account",
    name: "Account",
    component: React.lazy(() => import("../pages/Account")),
  },
  {
    path: "/topup",
    name: "Top Up",
    component: React.lazy(() => import("../pages/TopUp")),
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: React.lazy(() => import("../pages/Transactions")),
  },
];

export default appRoutes;
