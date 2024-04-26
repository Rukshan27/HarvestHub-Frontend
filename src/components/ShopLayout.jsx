import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";

const ShopLayout = (props) => {
  const { body } = props;
  return (
    <div>
      <Navbar />
      {body}
      <Footer />
    </div>
  );
};

export default ShopLayout;
