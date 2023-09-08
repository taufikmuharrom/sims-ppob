import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/authSlicer";
import { ProfilePhoto } from "../assets";
import { BsFillEyeFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { getBalance, getHistory } from "../store/transcSlicer";

const Transactions = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { balance, errorMessageTransc, history } = useSelector(
    (state) => state.transc
  );

  const [inputType, setInputType] = useState("password");

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
    dispatch(getHistory());
  }, []);

  useEffect(() => {
    if (errorMessageTransc) {
      toast.error(errorMessageTransc);
    }
  }, [errorMessageTransc]);

  //   {
  //     "invoice_number": "1694188446949",
  //     "transaction_type": "PAYMENT",
  //     "description": "Voucher Makanan",
  //     "total_amount": 100000,
  //     "created_on": "2023-09-08T15:54:06.949Z"
  // }

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
      <div className="space-y-5">
        <h1 className="font-semibold">Semua Transaksi</h1>
        {history &&
          history.map((item) => {
            return (
              <div
                key={item?.invoice_number}
                className="p-5 rounded-lg border border-gray-500 flex justify-between items-center"
              >
                <div>
                  <h1 className="font-semibold text-2xl">
                    Rp.{item?.total_amount}
                  </h1>
                  <p className="text-sm text-gray-400">{item?.created_on}</p>
                </div>
                <div>{item?.description}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Transactions;
