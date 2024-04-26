import React from "react";
import ShopLayout from "../../../components/ShopLayout";
import { useNavigate } from "react-router-dom";



const HomeShop = () => {
  const navigate = useNavigate()
  return (
    <ShopLayout
      body={
        <div className="h-screen flex">
          <div className="flex-1 flex flex-col justify-center gap-4 pl-32">
            <h2 className="text-black text-2xl font-semibold">
              NEW ARRIVALS ONLY
            </h2>
            <div className="text-black text-5xl font-light">
              <p>New</p>
              <p>Collection</p>
              <p>for Everyone</p>
            </div>
            <div onClick={() => navigate("/shop/vegetables")} className="hero-latest-btn flex justify-center items-center bg-red-500 text-white gap-2 w-64 h-16 rounded-full text-lg font-medium">
              <div>Latest Collection</div>
              <img
                src="/assets/arrow.png"
                className="h-5 w-6"
                alt="Arrow Icon"
              />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img
              src="/assets/vege.png"
              className="hero-img h-3/4 w-3/5"
              alt="Hero Image"
            />
          </div>
        </div>
      }
    />
  );
};

export default HomeShop;
