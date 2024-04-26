import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import SignInResolverSchema from "./SignInResolverSchema";
import { toast } from "react-toastify";
import http from "../../../util/HttpHelper";
import { AuthContext } from "../../../context/AuthContext";

const defaultValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setSession } = useContext(AuthContext);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(SignInResolverSchema),
  });

  const { errors } = formState;

  const onSubmit = async (formData) => {
    if (isLoading) return;

    console.log("Form Data: ", formData);
    const { email, password } = formData;

    setIsLoading(true);

    const loginOb = {
      email,
      password,
    };

    try {
      const res = await http.post("user/login", loginOb);
      toast.success("Logged in Successfully");
      setSession(res.data);
      reset();
      if (res.data?.user?.userType === "ADMIN") {
        navigate("/");
      } else {
        navigate("/shop/home");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
      setIsLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen flex">
      <div
        className="hidden h-full flex-auto items-center justify-center overflow-hidden md:flex"
        style={{
          backgroundImage: "url(/assets/goods.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#dedce7",
        }}
      ></div>
      <div className="h-screen overflow-y-auto p-3 flex justify-center py-8 ltr:border-r-1 rtl:border-l-1 sm:w-auto sm:h-auto sm:rounded-2xl sm:shadow md:h-full md:w-[480px] md:rounded-none md:shadow-none">
        <div className="mx-auto w-full sm:mx-0 sm:w-[350px]">
          <img src="/assets/logo.png" alt="logo" />
          <div className="text-3xl text-left text-[#212B36] leading-normal font-bold mt-3">
            Sign in to Continue
          </div>
          <div className="flex items-baseline font-medium text-[#212B36] my-3">
            <div>New user?</div>
            <div
              className="ml-4 text-green-600 font-600 hover:underline cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Create an account
            </div>
          </div>
          <form
            name="loginForm"
            noValidate
            className="mt-9 flex w-full flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field: { name, value, onChange, error } }) => (
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      !!errors.email
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {!!errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">
                        {errors?.email?.message}
                      </span>
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { name, value, onChange, error } }) => (
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                      !!errors.password
                        ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                        : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    }`}
                    placeholder=""
                  />
                  {!!errors.password && (
                    <p className="mt-2 text-sm text-red-600">
                      <span className="font-medium">
                        {errors?.password?.message}
                      </span>
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex items-center justify-end">
              <div
                className="text-md font-medium text-[#212B36] underline cursor-pointer"
                onClick={() => navigate("/password-reset")}
              >
                Forgot password?
              </div>
            </div>

            <button
              className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
