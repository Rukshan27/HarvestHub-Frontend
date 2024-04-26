import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";

import SignIn from "./app/auth/signin";
import SignUp from "./app/auth/signup";
import Home from "./app/dashboard/home";
import Users from "./app/dashboard/users";
import Products from "./app/dashboard/products";
import Stocks from "./app/dashboard/stocks";
import HomeShop from "./app/shop/home";
import VegetablesShop from "./app/shop/vegetables";
import FruitsShop from "./app/shop/fruits";
import MachinesShop from "./app/shop/machines";
import ShopProduct from "./app/shop/product";
import CartShop from "./app/shop/cart";
import PaymentShop from "./app/shop/payment";
import Dashboard from "./app/dashboard/dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/shop/home" element={<HomeShop />} />
            <Route path="/shop/vegetables" element={<VegetablesShop />} />
            <Route path="/shop/fruits" element={<FruitsShop />} />
            <Route path="/shop/machines" element={<MachinesShop />} />
            <Route path="/shop/product/:id" element={<ShopProduct />} />
            <Route path="/shop/cart" element={<CartShop />} />
            <Route path="/shop/payment" element={<PaymentShop />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="light"
      />
    </>
  );
};

export default App;
