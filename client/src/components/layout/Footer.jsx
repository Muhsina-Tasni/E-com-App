
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif text-stone-800 mb-4">
              PAGE TURNER
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              A curated digital library where timeless stories and modern
              literature meet. Discover, read, and explore books you love.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-stone-700 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li><Link to="/" className="hover:text-stone-800">Home</Link></li>
              <li><Link to="/products" className="hover:text-stone-800">Books</Link></li>
              <li><Link to="/register" className="hover:text-stone-800">Register</Link></li>
              <li><Link to="/login" className="hover:text-stone-800">Login</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-stone-700 mb-4">
              Categories
            </h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li>Fiction</li>
              <li>Non-Fiction</li>
              <li>Adventure</li>
              <li>Classic Literature</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-stone-700 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-stone-500 mb-4">
              Get updates on new arrivals and featured books.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:border-amber-600"
              />
              <button className="px-4 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} PAGETURNER. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-stone-500">
            <span className="hover:text-stone-800 cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-stone-800 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
