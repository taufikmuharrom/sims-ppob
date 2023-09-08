import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import tokenValidator from "./utils/tokenValidator";
import Main from "./layouts/Main";
import { useSelector } from "react-redux";
import { Suspense } from "react";

function App() {
  // const [count, setCount] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const isTokenExpired = tokenValidator();
  const loading = (
    <div className="fixed w-full h-full left-0 top-0 flex justify-center items-center font-semibold text-lg">
      Loading...
    </div>
  );
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              path="/auth"
              element={!isTokenExpired || isLoggedIn ? <Main /> : <Auth />}
            />

            <Route
              path="*"
              element={!isTokenExpired || isLoggedIn ? <Main /> : <Auth />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
