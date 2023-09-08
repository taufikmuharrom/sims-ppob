import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import tokenValidator from "./utils/tokenValidator";
import Main from "./layouts/Main";
import { useSelector } from "react-redux";

function App() {
  // const [count, setCount] = useState(0);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const isTokenExpired = tokenValidator();
  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
}

export default App;
