import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import DashboardLayout from "../../../components/DashboardLayout";
import http from "../../../util/HttpHelper";
import StockResolverSchema from "./StockResolverSchema";
import Modal from "../../../components/Modal";

const defaultValues = {
  limit: 0,
  stock: 0,
  product: "",
};

const Stocks = () => {
  const [stockList, setStockList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [selectedStock, setSelectedStock] = useState(null);
  const [newLimit, setNewLimit] = useState(0);
  const [newStock, setNewStock] = useState(0);

  const [isOpenLimit, setIsOpenLimit] = useState(false);
  const [isOpenStock, setIsOpenStock] = useState(false);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(StockResolverSchema),
  });

  const { errors } = formState;

  const handleFetchStocks = async () => {
    try {
      setIsDataLoading(true);
      const res = await http.get("stock/all");
      setStockList(res.data);
      setIsDataLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchProducts = async () => {
    try {
      const res = await http.get("product/all");
      setProductList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteStock = async (id) => {
    try {
      await http.post(`stock/delete/${id}`);
      handleFetchStocks();
      toast.success("Successfully Deleted Product");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
    }
  };

  const handleUpdateStockAlertLimit = async () => {
    try {
      if (newLimit <= 0) {
        toast.error("Value cant be 0 or less");
      }
      await http.put(`stock/alert/${selectedStock}/${newLimit}`);
      handleFetchStocks();
      setSelectedStock(null);
      setNewLimit(0);
      setIsOpenLimit(false);
      toast.success("Successfully Updated Stock");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
    }
  };

  const handleUpdateStockLimit = async () => {
    try {
      if (newStock <= 0) {
        toast.error("Value cant be 0");
      }
      await http.put(`stock/${selectedStock}/${newStock}`);
      handleFetchStocks();
      setSelectedStock(null);
      setNewStock(0);
      setIsOpenStock(false);
      toast.success("Successfully Updated Stock");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
    }
  };

  const onSubmit = async (formData) => {
    if (isLoading) return;

    console.log("Form Data: ", formData);
    const { product, limit, stock } = formData;

    setIsLoading(true);
    const stockOb = {
      product,
      limit,
      stock,
    };

    try {
      await http.post("stock/create", stockOb);
      toast.success("Successfully Created Stock");
      reset();
      handleFetchStocks();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.detail);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleFetchStocks();
    handleFetchProducts();
  }, []);

  return (
    <DashboardLayout
      body={
        <>
          <Modal
            body={
              <>
                <div>
                  <label
                    htmlFor="newLimit"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    New Alert Limit
                  </label>
                  <input
                    type="number"
                    id="newLimit"
                    value={newLimit}
                    onChange={(e) => setNewLimit(parseFloat(e.target.value))}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder=""
                  />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => handleUpdateStockAlertLimit()}
                  >
                    Update Alert limit
                  </button>
                </div>
              </>
            }
            isOpen={isOpenLimit}
            onClose={() => setIsOpenLimit(false)}
            title="Update Alert Limit"
          />

          <Modal
            body={
              <>
                <div>
                  <label
                    htmlFor="newStock"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    New Stock
                  </label>
                  <input
                    type="number"
                    id="newStock"
                    value={newStock}
                    onChange={(e) => setNewStock(parseFloat(e.target.value))}
                    className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder=""
                  />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => handleUpdateStockLimit()}
                  >
                    Update Stock
                  </button>
                </div>
              </>
            }
            isOpen={isOpenStock}
            onClose={() => setIsOpenStock(false)}
            title="Update Stock"
          />
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
                    Stocks
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <h3 className="text-3xl font-bold text-gray-800 my-3">
            Stock Management
          </h3>

          <form
            name="userCreationForm"
            noValidate
            className="my-9"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-3">
              <Controller
                name="product"
                control={control}
                defaultValue=""
                render={({ field: { name, value, onChange } }) => (
                  <div>
                    <label
                      htmlFor="product"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Product
                    </label>
                    <select
                      id="product"
                      name={name}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.product
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      onChange={onChange}
                    >
                      <option value="">Choose a Product</option>
                      {productList.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {!!errors.product && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.product?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="stock"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div>
                    <label
                      htmlFor="stock"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Stock Limit
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.stock
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder=""
                    />
                    {!!errors.stock && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.stock?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="limit"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <div>
                    <label
                      htmlFor="limit"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Stock Alert Limit
                    </label>
                    <input
                      type="number"
                      id="limit"
                      name={name}
                      value={value}
                      onChange={onChange}
                      className={`bg-gray-50 border  text-sm rounded-lg  block w-full p-3 ${
                        !!errors.limit
                          ? "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500"
                          : "border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      }`}
                      placeholder=""
                    />
                    {!!errors.limit && (
                      <p className="mt-2 text-sm text-red-600">
                        <span className="font-medium">
                          {errors?.limit?.message}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <button
                className="select-none rounded-lg bg-gray-900 my-3 py-2 px-4 text-center align-middle font-sans text-md font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="submit"
              >
                Create Stock
              </button>
            </div>
          </form>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock Limit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock Alert Limit
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
                    {stockList?.length === 0 ? (
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
                        {stockList?.map((emp, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {emp?.product}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {emp?.stock}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {emp?.limit}
                            </td>
                            <td className="px-6 py-4 flex gap-3">
                              <span
                                className="font-medium text-green-600 hover:underline cursor-pointer"
                                onClick={() => {
                                  setSelectedStock(emp?.id);
                                  setIsOpenStock(true);
                                }}
                              >
                                Update Stock
                              </span>
                              <span
                                className="font-medium text-blue-600 hover:underline cursor-pointer"
                                onClick={() => {
                                  setSelectedStock(emp?.id);
                                  setIsOpenLimit(true);
                                }}
                              >
                                Update Alert Limit
                              </span>
                              <span
                                className="font-medium text-red-600 hover:underline cursor-pointer"
                                onClick={() => handleDeleteStock(emp?.id)}
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

export default Stocks;
