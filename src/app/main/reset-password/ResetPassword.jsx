import React from "react";

const ResetPassword = () => {
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
      <div className="h-full w-full p-3 flex justify-center py-8 ltr:border-r-1 rtl:border-l-1 sm:w-auto sm:h-auto sm:rounded-2xl sm:shadow  md:h-full md:w-[480px] md:rounded-none md:shadow-none">
        <div className="mx-auto w-full sm:mx-0 sm:w-[350px]">
          <img src="/assets/logo.png" alt="logo" />
          <div className="text-3xl text-left text-[#212B36] leading-normal font-bold mt-3">
            Forgot password?
          </div>
          <div className="flex items-baseline font-medium text-[#212B36] my-3">
            <div>Fill the form to reset your password</div>
          </div>
          <form className="mt-9 flex w-full flex-col justify-center">
            <div className="relative w-full min-w-[200px] h-10 my-3">
              <input
                className="bg-lime-50 peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-teal-500"
                placeholder=" "
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-teal-500 before:border-blue-gray-200 peer-focus:before:!border-teal-500 after:border-blue-gray-200 peer-focus:after:!border-teal-500">
                Email address
              </label>
            </div>

            <button
              className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Send OTP
            </button>
          </form>

          <div className="mt-3">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              Return to{" "}
              <span className="text-green-600 font-bold">Sign in</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
