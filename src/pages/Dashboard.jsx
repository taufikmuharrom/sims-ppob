import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/authSlicer";
import { ProfilePhoto } from "../assets";
import { BsFillEyeFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { createPayment, getBalance } from "../store/transcSlicer";
import { getBanners, getServices } from "../store/infoSlicer";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { balance, successMessageTransc, errorMessageTransc } = useSelector(
    (state) => state.transc
  );
  const { serviceList, bannerList, errorMessageInfo } = useSelector(
    (state) => state.info
  );

  const [inputType, setInputType] = useState("password");
  const [serviceDetail, setServiceDetail] = useState(null);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getBalance());
    dispatch(getServices());
    dispatch(getBanners());
  }, []);

  useEffect(() => {
    if (errorMessageTransc) {
      toast.error(errorMessageTransc);
    }
    if (errorMessageInfo) {
      toast.error(errorMessageInfo);
    }
    if (successMessageTransc) {
      toast.success(successMessageTransc);
      setServiceDetail(null);
      dispatch(getBalance());
    }
  }, [errorMessageTransc, errorMessageInfo, successMessageTransc]);

  const payService = () => {
    const payloads = {
      service_code: serviceDetail.service_code,
    };
    dispatch(createPayment(payloads));
  };

  return (
    <div className="mt-7 space-y-10">
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
      {/* SERVICES */}
      {!serviceDetail && (
        <div className="grid grid-cols-12 gap-1">
          {serviceList &&
            serviceList.map((service) => {
              return (
                <div
                  key={service.service_code}
                  className="cursor-pointer hover:scale-110"
                  onClick={() => {
                    setServiceDetail(service);
                  }}
                >
                  <img src={service.service_icon} />
                  <p className="text-xs text-center pr-6">
                    {service.service_name}
                  </p>
                </div>
              );
            })}
        </div>
      )}
      {/* BANNER */}
      {!serviceDetail && (
        <div className="space-y-5">
          <h1 className="font-semibold">Temukan promo menarik</h1>
          <div className="flex justify-between overflow-y-auto gap-3">
            {bannerList &&
              bannerList.map((banner) => {
                return (
                  <div key={banner.name} className="cursor-pointer ">
                    <img src={banner.banner_image} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {/* SERVICE DETAILS */}
      {serviceDetail && (
        <div className="space-y-4">
          <h1>Pembayaran</h1>
          <div className="flex gap-3 items-center">
            <img src={serviceDetail.service_icon} className="w-10 h-10" />
            <h1 className="font-bold">{serviceDetail.service_name}</h1>
          </div>
          <div className="inputField">
            <input value={serviceDetail.service_tariff} disabled />
          </div>
          <button
            className="bg-red-500 w-full hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
            onClick={payService}
          >
            Bayar
          </button>
          <button
            className="border-red-500 border bg-white w-full hover:opacity-50 text-red-500 font-medium py-2 px-4 rounded"
            onClick={() => {
              setServiceDetail(null);
            }}
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
