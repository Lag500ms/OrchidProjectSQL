import { useEffect, useState } from "react";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

const NavBar = () => {
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { authChanged } = useAuth();
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const decoded = jwtDecode(storedToken);
        setIsLoggedIn(true);
        setUserName(decoded.sub || decoded.username || "User");
        const role = decoded.role || decoded.roles || decoded.authorities;
        setUserRole(Array.isArray(role) ? role[0] : role);
      }
    } catch (e) {
      console.warn("Invalid token", e.message);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
  }, [authChanged]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-4 py-2 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-orchid-flower-logo-design-template-vector-icon-png-image_5101180.jpg"
          alt="logo"
          className="h-8"
        />
        <div>
          <h1 className="font-bold text-xl">ORCHIDWEB</h1>
          <p className="text-sm">PRESENTED BY VINH ĐẸP TRAI</p>
        </div>
      </Link>

      <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
        <li><Link to="/orchids" className="hover:text-purple-600">Orchids</Link></li>
        {isLoggedIn && userRole === "ROLE_ADMIN" && (
          <>
            <li><Link to="/manageUsers" className="hover:text-purple-600">Manage Users</Link></li>
            <li><Link to="/manageOrchids" className="hover:text-purple-600">Manage Orchids</Link></li>
          </>
        )}
      </ul>

      <div className="flex items-center gap-4">
        <FaShoppingBag
          className="cursor-pointer"
          title="Cart"
          onClick={() => setShowCart(!showCart)}
        />

        {showCart && (
          <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-red-600"
              onClick={() => setShowCart(false)}
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FaShoppingBag className="text-5xl mb-2" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <>
                <ul className="space-y-3">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-start border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">x{item.quantity} • ${item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-sm hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <Link to="/cart">
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Go to Cart
                  </button>
                </Link>
              </>
            )}
          </div>
        )}

        <div className="border-l border-gray-300 h-5 mx-2"></div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(isLoggedIn ? "/profile" : "/login")}
        >
          <FaUser title={isLoggedIn ? "Profile" : "Login"} />
          {isLoggedIn && userName && (
            <span className="text-sm text-gray-700">Hi, {userName}</span>
          )}
        </div>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline ml-2"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
