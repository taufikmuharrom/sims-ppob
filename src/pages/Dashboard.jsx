import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/authSlicer";
import { ProfilePhoto } from "../assets";
import { BsFillEyeFill } from "react-icons/bs";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [saldo, setSaldo] = useState(12342);
  const [inputType, setInputType] = useState("password");
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <div className="mt-7">
      {/* TOP */}
      <div className="grid grid-cols-2">
        <div>
          <img
            src={
              user?.profile_image.includes("null")
                ? ProfilePhoto
                : user?.profile_image
            }
            className="w-16 h-16 rounded-full mb-5"
          />
          <h2 className="mb-2 text-xl">Selamat Datang,</h2>
          <h1 className="text-3xl font-semibold">
            {user?.first_name} {user?.last_name}
          </h1>
        </div>
        <div className="bg-red-500 rounded-lg h-full w-full px-5 py-6 space-y-4 text-white">
          <h3 className="">Saldo Anda</h3>
          <div className="text-3xl">
            Rp{" "}
            <input
              value={saldo}
              className="bg-transparent outline-none "
              disabled
              type={inputType}
            />
          </div>
          <div
            className="text-xs flex gap-3 items-center cursor-pointer"
            onClick={() => {
              const type = inputType === "text" ? "password" : "text";
              setInputType(type);
            }}
          >
            <p>Lihat Saldo</p>
            <span>
              <BsFillEyeFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
