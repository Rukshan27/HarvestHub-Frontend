import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ShopLayout from "../../../components/ShopLayout";
import http from "../../../util/HttpHelper";
import { floatToStringFormatter } from "../../../util/StringFormatter";
import { AuthContext } from "../../../context/AuthContext";

const ShopProduct = () => {
  const [product, setProduct] = useState();

  const { id } = useParams();

  const { addToCart } = useContext(AuthContext);

  const handleFetchProduct = async () => {
    try {
      const res = await http.get(`/product/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchProduct();
  }, [id]);
  return (
    <ShopLayout
      body={
        <div className="py-6 px-32">
          <div className="flex items-center gap-2 text-gray-600 text-lg font-semibold uppercase">
            HOME{" "}
            <img
              src="/assets/right-arrow.png"
              className="w-3 h-3"
              alt="Arrow Icon"
            />{" "}
            SHOP{" "}
            <img
              src="/assets/right-arrow.png"
              className="w-3 h-3"
              alt="Arrow Icon"
            />{" "}
            {product?.productType}{" "}
            <img
              src="/assets/right-arrow.png"
              className="w-3 h-3"
              alt="Arrow Icon"
            />{" "}
            {product?.name}
          </div>
          <div className="flex my-12 ">
            <div className="flex gap-4">
              <div className="">
                <img src={product?.photo} className="w-60 h-32" />
              </div>
            </div>
            <div className="flex flex-col mx-16">
              <h1 className="text-gray-900 text-3xl font-bold">
                {product?.name}
              </h1>
              <div className="productdisplay-right-prices flex my-5 space-x-10 text-lg font-semibold">
                {product?.discount !== 0 && (
                  <div className="productdisplay-right-price-old text-gray-600 line-through">
                    Rs {floatToStringFormatter(product?.price)}
                  </div>
                )}
                <div className="productdisplay-right-price-new text-red-600">
                  Rs{" "}
                  {floatToStringFormatter(
                    product?.price - (product?.price * product?.discount) / 100
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                }}
                className="bg-red-600 py-4 px-6 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300"
              >
                ADD TO CART
              </button>
              <p className="productdisplay-right-category mt-4">
                <span className="font-semibold">Category :</span>{" "}
                {product?.productType}
              </p>
            </div>
          </div>
          <div className="mx-24">
            <div className="">
              <div className="flex items-center justify-center text-base font-semibold w-48 h-12 border border-gray-300">
                Description
              </div>
            </div>
            <div className="flex flex-col gap-4 border border-gray-300 p-8 pb-10">
              <p>
                HarvestHub is your premier online destination for farm-fresh
                produce directly from local farmers. Our platform connects
                consumers with a wide range of high-quality, sustainably grown
                fruits, vegetables, machine items and more, straight from the
                source. With a focus on supporting local agriculture and
                promoting transparency in the food supply chain, HarvestHub
                offers a convenient and reliable way for customers to access the
                freshest ingredients while empowering farmers to reach a broader
                market.
              </p>
              <p>
                Join us in cultivating a healthier, more sustainable food
                system, one harvest at a time. Welcome to HarvestHub - where
                farm-fresh goodness meets modern convenience.
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ShopProduct;
