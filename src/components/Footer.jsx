import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex items-center gap-5">
        <img src="/assets/logo.png" className="logo h-20 w-32" alt="Logo" />
      </div>
      <div className="flex gap-6">
        <div className="p-3 pb-0">
          <img src="/assets/insta.png" className="w-6 h-6" alt="Instagram" />
        </div>
        <div className="p-3 pb-0">
          <img src="/assets/fb.png" className="w-6 h-6" alt="Facebook" />
        </div>
        <div className="p-3 pb-0">
          <img src="/assets/whatsapp.png" className="w-6 h-6" alt="WhatsApp" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 w-full mb-6 text-gray-700 text-sm">
        <hr className="w-4/5 rounded-full h-1 bg-gray-300" />
        <p>Copyright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
