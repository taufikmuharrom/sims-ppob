import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../store/authSlicer";
import { ProfilePhoto } from "../assets";
import { BsFillEyeFill } from "react-icons/bs";
import toast from "react-hot-toast";
import { getBalance } from "../store/transcSlicer";
import { getBanners, getServices } from "../store/infoSlicer";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { balance, errorMessageTransc } = useSelector((state) => state.transc);
  const { serviceList, bannerList, errorMessageInfo } = useSelector(
    (state) => state.info
  );
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState("password");

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
  }, [errorMessageTransc, errorMessageInfo]);

  //   {
  //     "service_code": "PAJAK",
  //     "service_name": "Pajak PBB",
  //     "service_icon": "https://minio.nutech-integrasi.app/take-home-test/services/PBB.png",
  //     "service_tariff": 40000
  // }

  //   {
  //     "banner_name": "Banner 1",
  //     "banner_image": "https://minio.nutech-integrasi.app/take-home-test/banner/Banner-1.png",
  //     "description": "Lerem Ipsum Dolor sit amet"
  // }

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
      <div className="grid grid-cols-12 gap-1">
        {serviceList &&
          serviceList.map((service) => {
            return (
              <div
                key={service.service_code}
                className="cursor-pointer hover:scale-110"
              >
                <img src={service.service_icon} />
                <p className="text-xs text-center pr-6">
                  {service.service_name}
                </p>
              </div>
            );
          })}
      </div>
      {/* BANNER */}
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
    </div>
  );
};

export default Dashboard;
