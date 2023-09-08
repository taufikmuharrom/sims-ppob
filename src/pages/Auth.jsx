import React, { useState } from "react";
import { PicLogin, Logo } from "../assets";
import FormInput from "../components/FormInput";

const Auth = () => {
  const [formType, setFormType] = useState("Login");

  const [registerValue, setRegisterValue] = useState({
    namaDepan: "",
    namaBelakang: "",
    email: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const formLogin = [
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "masukan email anda",
      errorMessage: "Email tidak valid!",
      required: true,
      autoComplete: "off",
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "masukkan password anda",
      errorMessage: "password tidak boleh kosong!",
      required: true,
      autoComplete: "off",
    },
  ];

  const formRegistration = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "masukan email anda",
      errorMessage: "Email tidak valid!",
      required: true,
      autoComplete: "off",
    },
    {
      id: 2,
      name: "namaDepan",
      type: "text",
      placeholder: "nama depan",
      errorMessage: "Nama depan tidak boleh kosong!",
      required: true,
      autoComplete: "off",
    },
    {
      id: 3,
      name: "namaBelakang",
      type: "text",
      placeholder: "nama belakang",
      errorMessage: "Nama belakang tidak boleh kosong!",
      required: true,
      autoComplete: "off",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "buat password",
      errorMessage: "password minimal 8 karakter!",
      required: true,
      pattern: ".{8,}",
      autoComplete: "off",
    },
    {
      id: 5,
      name: "konfirmasiPassword",
      type: "password",
      placeholder: "konfirmasi password",
      errorMessage: "password tidak sama!",
      required: true,
      pattern: registerValue.password,
      autoComplete: "off",
    },
  ];

  const handleOnChangeLogin = (e) => {
    setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
  };

  const handleOnChangeRegister = (e) => {
    setRegisterValue({ ...registerValue, [e.target.name]: e.target.value });
  };

  const handleSwicthFormType = () => {
    const type = formType === "Login" ? "Registrasi" : "Login";
    setFormType(type);
    clearFormData();
  };

  const clearFormData = () => {
    const emptyRegistrationForm = {
      namaDepan: "",
      namaBelakang: "",
      email: "",
      password: "",
      konfirmasiPassword: "",
    };
    const emptyLoginForm = {
      email: "",
      password: "",
    };

    formType === "Login"
      ? setRegisterValue(emptyRegistrationForm)
      : setRegisterValue(emptyLoginForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("REGISTER", registerValue);
    console.log("LOGIN", loginValue);
  };
  const formDesc =
    formType === "Login"
      ? "Masuk atau buat akun untuk memulai"
      : "Lengkapi data untuk membuat akun";
  return (
    <div className="flex justify-center max-h-screen">
      <div className="container">
        <div className="grid grid-cols-2 mdmax:grid-cols-1 mdmax:p-10">
          <div className="flex justify-center items-center">
            <div className="max-h-fit space-y-5">
              {/* LOGO & TITLE*/}
              <div className="flex justify-center gap-2 items-center font-bold">
                <img src={Logo} /> <h1>SIMS PPOB</h1>
              </div>
              <div className="w-3/4 mx-auto">
                <h1 className="text-center font-semibold text-2xl">
                  {formDesc}
                </h1>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {formType === "Login"
                  ? formLogin.map((field) => (
                      <FormInput
                        key={field.id}
                        {...field}
                        value={loginValue[field.name]}
                        onChange={handleOnChangeLogin}
                      />
                    ))
                  : formRegistration.map((field) => (
                      <FormInput
                        key={field.id}
                        {...field}
                        value={registerValue[field.name]}
                        onChange={handleOnChangeRegister}
                      />
                    ))}
                <button className="bg-red-500 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  {formType}
                </button>
              </form>
              <p className="text-center text-xs ">
                {formType === "Login" ? "belum" : "sudah"} punya akun ?{" "}
                {formType === "Login" ? "register" : "login"}
                <span
                  className="text-red-500 font-bold cursor-pointer"
                  onClick={handleSwicthFormType}
                >
                  {" "}
                  disini
                </span>
              </p>
            </div>
          </div>
          <div className="mdmax:hidden">
            <img src={PicLogin} className="max-h-screen w-full object-fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
