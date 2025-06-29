import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2C4955] text-white px-6 py-4 text-base font-light">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Logo + social + copyright */}
        <div className="flex flex-col justify-between gap-4 md:w-1/4">
          <div className="flex items-center gap-2">
            <img
              src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-orchid-flower-logo-design-template-vector-icon-png-image_5101180.jpg"
              alt="Orchid Logo"
              className="h-10"
            />
            <div>
              <h1 className="font-bold text-xl">ORCHIDWEB</h1>
              <p className="text-sm">PRESENTED BY VINH ĐẸP TRAI</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/FPTU.HCM" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-white hover:text-gray-300 text-lg" />
            </a>
          </div>
          <p className="text-xs text-gray-300 mt-4">
            ©2025 Orchids Project. All rights reserved.
          </p>
        </div>

        {/* Orchids Limited */}
        <div className="md:w-1/4">
          <h3 className="font-bold mb-2">Orchids Project</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">About Us</a></li>
            <li><a href="/" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/" className="hover:underline">Store Hours & Directions</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div className="md:w-1/4">
          <h3 className="font-bold mb-2">Shop</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Orchids</a></li>
            <li><a href="/" className="hover:underline">Sale</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="md:w-1/4">
          <h3 className="font-bold mb-2">Contact Us</h3>
          <p className="text-sm italic">
            Lô E2a-7, Đường D1, Khu Công nghệ cao,<br />
            P.Long Thạnh Mỹ, Thủ Đức, TP.HCM, Vietnam 70000
          </p>
          <p className="text-sm italic mt-1">
            Email: <a href="mailto:vinhltse182829@fpt.edu.vn" className="text-blue-400">vinhly123tn61@gmail.com</a>
          </p>
          <p className="font-semibold mt-1">012 345 6789</p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
