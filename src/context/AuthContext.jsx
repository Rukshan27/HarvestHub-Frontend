import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import http from "../util/HttpHelper";
import Loading from "../components/Loading";

const nonAuthRoutes = ["/sign-in", "/sign-up", "/password-reset"];

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const setSession = (data) => {
    setUser(data.user);
    localStorage.setItem("token", data.accessToken);
  };

  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Successfully Signed Out");
    navigate("sign-in");
  };

  console.log("Auth Context:", user);

  const addToCart = (newItem) => {
    // Create a copy of the cart items array
    const updatedCart = [...cartItems];
    // Check if the new item already exists in the cart
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      // If the item exists, increase its quantity
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        qty: updatedCart[existingItemIndex].qty + 1,
      };
    } else {
      // If the item doesn't exist, add it to the cart
      updatedCart.push({ ...newItem, qty: 1 });
    }
    // Update the state with the new cart items array
    setCartItems(updatedCart);
    console.log(updatedCart);
  };

  const removeFromCart = (itemId) => {
    // Create a copy of the cart items array
    const updatedCart = [...cartItems];
    // Find the index of the item to be removed
    const itemIndex = updatedCart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      // Remove the item from the cart
      updatedCart.splice(itemIndex, 1);
      // Update the state with the new cart items array
      setCartItems(updatedCart);
      console.log(updatedCart);
    } else {
      console.log("Item not found in cart.");
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount +=
        (item?.price - (item?.price * item?.discount) / 100) * item?.qty;
    });
    return totalAmount;
  };

  const getTotalCartItems = () => {
    return cartItems?.length;
  };

  const setCartEmpty = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    if (token) {
      http
        .get("user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
      if (!nonAuthRoutes.includes(location.pathname)) {
        navigate("/sign-in");
      }
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{
            isAuthenticated,
            user,
            setSession,
            signout,
            getTotalCartAmount,
            getTotalCartItems,
            cartItems,
            addToCart,
            removeFromCart,
            setCartEmpty,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export { AuthProvider };
