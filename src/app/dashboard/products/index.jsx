import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../../../context/AuthContext";
import DashboardLayout from "../../../components/DashboardLayout";
import http from "../../../util/HttpHelper";
import ProductResolverSchema from "./ProductResolverSchema";
import { PRODUCT_TYPES } from "../../../Constants";
import { floatToStringFormatter } from "../../../util/StringFormatter";

const defaultValues = {
  price: 0,
  discount: 0,
  name: "",
  photo: null,
  type: null,
};

const Products = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(ProductResolverSchema),
  });

  const { errors } = formState;

  const handleFetchProducts = async () => {
    try {
      setIsDataLoading(true);
      const res = await http.get("product/all");
      setProductList(res.data);
      setIsDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await http.post(`product/delete/${id}`);
      handleFetchProducts();
      toast.success("Successfully Deleted Product");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
    }
  };

  const onSubmit = async (formData) => {
    if (isLoading) return;

    console.log("Form Data: ", formData);
    const { name, price, discount, photo, type } = formData;

    setIsLoading(true);
    const productOb = {
      name,
      price,
      discount,
      productType: type,
      photo,
    };

    try {
      const res = await http.post("product/create", productOb);
      toast.success("Successfully Created Product");
      reset();
      handleFetchProducts();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
    }
    setIsLoading(false);
  };

  const uploadedFile = watch("photo");

  useEffect(() => {
    handleFetchProducts();
  }, []);

  return (
    <DashboardLayout
      body={
        <>
          <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-auto"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Products
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <h3 className="text-3xl font-bold text-gray-800 my-3">
            Product Management
          </h3>

          <form
            name="userCreationForm"
            noValidate
            className="my-9"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-3">
              <Controller
                name="name"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.name
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder=""
                    />
                    {!!errors.name && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.name?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="price"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Price per Unit
                    </label>
                    <input
                      type="number"
                      id="price"
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.price
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder=""
                    />
                    {!!errors.price && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.price?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="discount"
                control={control}
                render={({ field: { name, value, onChange, error } }) => (
                  <div>
                    <label
                      htmlFor="discount"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Discount Percentage
                    </label>
                    <input
                      type="text"
                      id="discount"
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.discount
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder=""
                    />
                    {!!errors.discount && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.discount?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="type"
                control={control}
                defaultValue=""
                render={({ field: { name, value, onChange } }) => (
                  <div>
                    <label
                      htmlFor="type"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product Type
                    </label>
                    <select
                      id="type"
                      name={name}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.type
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      onChange={onChange}
                    >
                      <option value="">Choose a Type</option>
                      {PRODUCT_TYPES.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {!!errors.type && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.type?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="grid grid-cols-2">
              <Controller
                name="photo"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center flex-col justify-center w-full">
                      <div className="block mb-2 mt-1 text-sm font-medium text-gray-900 text-left w-full">
                        Photo
                      </div>
                      <label
                        htmlFor="photo"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload Photo
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG
                          </p>
                        </div>
                        <input
                          id="photo"
                          type="file"
                          accept="image/*"
                          name={name}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              onChange(reader.result);
                            };
                            reader.onerror = (error) => {
                              console.error("Error: ", error);
                            };
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {!!errors.photo && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.photo?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />

              {uploadedFile && (
                <img
                  src={uploadedFile}
                  alt="Uploaded profile picture"
                  className="rounded-full mx-auto w-32 h-32 my-10 border-2"
                />
              )}
            </div>
            <div>
              <button
                className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Create Product
              </button>
            </div>
          </form>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price per Unit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount Percentage
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isDataLoading ? (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      colSpan={7}
                      className="px-6 py-4 font-medium text-center text-red-600 whitespace-nowrap dark:text-white"
                    >
                      <div
                        role="status"
                        className="w-full flex justify-center items-center text-center"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </th>
                  </tr>
                ) : (
                  <>
                    {productList?.length === 0 ? (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          colSpan={7}
                          className="px-6 py-4 font-medium text-red-600 text-center whitespace-nowrap dark:text-white"
                        >
                          No Data
                        </th>
                      </tr>
                    ) : (
                      <>
                        {productList?.map((emp, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="px-6 py-4">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={emp?.photo}
                                alt="product photo"
                              />
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {emp?.name}
                            </th>
                            <td className="px-6 py-4 text-right">
                              {floatToStringFormatter(emp?.price)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {emp?.discount}%
                            </td>
                            <td className="px-6 py-4 text-center">
                              {emp?.productType}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span
                                className="font-medium text-red-600 hover:underline cursor-pointer"
                                onClick={() => handleDeleteProduct(emp?.id)}
                              >
                                Delete
                              </span>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
};

export default Products;
