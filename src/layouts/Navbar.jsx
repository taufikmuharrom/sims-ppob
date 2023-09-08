import { Logo } from "../assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between py-5">
          <Link to="/">
            <div className="flex justify-center gap-2 items-center font-bold">
              <img src={Logo} /> <h1>SIMS PPOB</h1>
            </div>
          </Link>

          <ul className="flex space-x-8">
            <li>
              <Link to="/topup">Top Up</Link>
            </li>
            <li>
              <Link to="/transactions">Transaction</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload(false);
              }}
            >
              Log Out
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
