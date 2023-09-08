import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/authSlicer";
import { ProfilePhoto } from "../assets";
import { BsFillEyeFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { createTopUp, getBalance } from "../store/transcSlicer";
import FormInput from "../components/FormInput";

const TopUp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { balance, errorMessageTransc, successMessageTransc } = useSelector(
    (state) => state.transc
  );
  const [topUpValue, setTopUpValue] = useState(null);

  const [inputType, setInputType] = useState("password");

  const topUpOptions = [
    {
      label: "10.000",
      value: 10000,
    },
    {
      label: "20.000",
      value: 20000,
    },
    {
      label: "50.000",
      value: 50000,
    },
    {
      label: "100.000",
      value: 100000,
    },
    {
      label: "250.000",
      value: 250000,
    },
    {
      label: "500.000",
      value: 500000,
    },
  ];

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
  }, []);

  useEffect(() => {
    if (errorMessageTransc) {
      toast.error(errorMessageTransc);
    }
    if (successMessageTransc) {
      toast.success(successMessageTransc);
      dispatch(getBalance());
      setTopUpValue(null);
    }
  }, [errorMessageTransc, successMessageTransc]);

  const inputField = {
    type: "number",
    placeholder: "masukan nominal Top Up",
    errorMessage:
      "nominal top up tidak boleh kosong dan tidak boleh kurang dari 10.000",
    required: true,
    pattern: "^d{5,}$",
    autoComplete: "off",
  };

  const doTopUp = (e) => {
    e.preventDefault();
    if (parseInt(topUpValue) < 10000) {
      return toast.error(
        "nominal top up tidak boleh kosong dan tidak boleh kurang dari 10.000"
      );
    }
    const payloads = {
      top_up_amount: topUpValue,
    };
    dispatch(createTopUp(payloads));
  };

  return (
    <div className="mt-7 space-y-10 mb-10">
      {/* USER AND SALDO */}
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
              value={balance}
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
      <div className="space-y-1">
        <h1>Silahkan Masukan</h1>
        <h1 className="font-semibold text-3xl">Nominal Top Up</h1>
      </div>
      <div className="flex gap-5">
        <div className="w-8/12">
          <form onSubmit={doTopUp} className="space-y-1">
            <FormInput
              {...inputField}
              value={topUpValue}
              onChange={(e) => setTopUpValue(e.target.value)}
            />
            <button className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Top Up
            </button>
          </form>
        </div>
        <div className="w-4/12 grid grid-cols-3 gap-3">
          {topUpOptions &&
            topUpOptions.map((item) => {
              return (
                <div
                  key={item.label}
                  className="rounded-lg p-2 border border-gray-400 text-center cursor-pointer"
                  onClick={() => setTopUpValue(item.value)}
                >
                  {item.label}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopUp;
