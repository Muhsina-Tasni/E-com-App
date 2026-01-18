import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import {
  ShoppingCart,
  User,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfile = () => {
    if (!user) navigate("/login");
    else navigate("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleCart = () => {
    if (!user) navigate("/login");
    else navigate("/cart");
    setIsMobileMenuOpen(false);
  };

  const activeClass = "text-amber-600 font-semibold";
  const normalClass = "text-black hover:text-amber-500";

  return (
    <header className="bg-stone-100 border-b border-stone-300 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-4 lg:py-6">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="text-2xl sm:text-3xl font-serif cursor-pointer"
          >
            <span className="font-bold">PAGE</span>
            <span className="font-light">TURNER</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              HOME
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              PRODUCTS
            </NavLink>

            <NavLink
              to="/offer"
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              OFFER
            </NavLink>
          </nav>

          {/* Icons */}
          <div className="hidden lg:flex items-center gap-5">
            <ShoppingCart onClick={handleCart} className="cursor-pointer hover:text-amber-600" />
            <User onClick={handleProfile} className="cursor-pointer hover:text-amber-600" />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="lg:hidden">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-stone-100 border-t">
          <div className="flex flex-col p-4 gap-4">

            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              HOME
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              PRODUCTS
            </NavLink>

            <NavLink
              to="/offer"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeClass : normalClass)}
            >
              OFFER
            </NavLink>

            <button onClick={handleCart} className="text-left hover:text-amber-600">
              CART
            </button>

            <button onClick={handleProfile} className="text-left hover:text-amber-600">
              PROFILE
            </button>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


