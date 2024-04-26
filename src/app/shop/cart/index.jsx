import React, { useContext } from "react";

import ShopLayout from "../../../components/ShopLayout";
import { AuthContext } from "../../../context/AuthContext";
import { floatToStringFormatter } from "../../../util/StringFormatter";
import { useNavigate } from "react-router-dom";

const CartShop = () => {
  const { getTotalCartAmount, cartItems, removeFromCart } =
    useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <ShopLayout
      body={
        <div className="cartitems m-24">
          <div className="cartitems-format-main grid grid-cols-6 items-center gap-x-20 py-4 text-gray-700 text-xl font-semibold">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr className="my-4 border-t border-gray-300" />
          {cartItems.map((item, index) => {
            return (
              <div key={index}>
                <div className="py-4 grid grid-cols-6 justify-center">
                  <img
                    src={item?.photo}
                    className="h-16 w-24"
                    alt={item?.name}
                  />
                  <p>{item?.name}</p>
                  <p>
                    Rs{" "}
                    {floatToStringFormatter(
                      item?.price - (item?.price * item?.discount) / 100
                    )}
                  </p>
                  <button className="w-16 h-12">{item?.qty}</button>
                  <p>
                    Rs{" "}
                    {floatToStringFormatter(
                      (item?.price - (item?.price * item?.discount) / 100) *
                        item?.qty
                    )}
                  </p>
                  <img
                    src="/assets/remove.png"
                    className="w-6 h-6"
                    alt="remove"
                    onClick={() => removeFromCart(item?.id)}
                  />
                </div>
                <hr className="my-4 border-t border-gray-300" />
              </div>
            );
          })}
          <div className="cartitems-down flex my-8">
            <div className="cartitems-total flex-1 flex flex-col mr-40">
              <h1 className="text-2xl font-semibold">Cart Totals</h1>
              <div>
                <div className="cartitems-total-item flex justify-between py-4">
                  <p>Subtotal</p>
                  <p>Rs {floatToStringFormatter(getTotalCartAmount())}</p>
                </div>
                <hr className="my-2 border-t border-gray-300" />
                <div className="cartitems-total-item flex justify-between py-4">
                  <p>Delivery Fee</p>
                  <p>Free</p>
                </div>
                <hr className="my-2 border-t border-gray-300" />
                <div className="cartitems-total-item flex justify-between py-4">
                  <h3>Total</h3>
                  <h3>Rs {floatToStringFormatter(getTotalCartAmount())}</h3>
                </div>
              </div>
              <button
                className="w-60 h-16 bg-red-500 text-white text-lg font-semibold mt-8"
                onClick={() => navigate("/shop/payment")}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CartShop;
