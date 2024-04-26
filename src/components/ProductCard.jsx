import React from "react";
import { floatToStringFormatter } from "../util/StringFormatter";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, name, price, discount, photo, type } = props;
  return (
    <div className="w-72 hover:transform hover:scale-105 hover:transition hover:duration-700">
      <Link to={`/shop/product/${id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={photo} />
      </Link>
      <p className="my-2">{name}</p>
      <div className="flex gap-5">
        <div className=" text-gray-700 text-lg font-semibold">
          Rs {floatToStringFormatter(price - (price * discount) / 100)}
        </div>
        {discount !== 0 && (
          <div className=" text-gray-500 text-lg font-medium line-through">
            Rs {floatToStringFormatter(price)}{" "}
          </div>
        )}
        <div className=" text-gray-700 text-lg font-semibold">
          {type === "MACHINE" ? " / Unit" : " / Kg"}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
