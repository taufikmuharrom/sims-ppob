import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import appRoutes from "../routes";

const Main = () => {
  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
            textAlign: "left",
            fontSize: "14px",
            padding: "20px",
          },
        }}
      />
      <Navbar />
      <div className="flex justify-center">
        <div className="container mt-20">
          <Routes>
            {appRoutes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    name={route.name}
                    element={<route.component />}
                  />
                )
              );
            })}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Main;
