

// import { BookOpen, Facebook, Instagram, Twitter } from "lucide-react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Top Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* Brand Info */}
//           <div className="col-span-1 md:col-span-2">
//             <div className="flex items-center space-x-2 mb-4">
//               <BookOpen className="w-8 h-8 text-purple-400" />
//               <span className="text-2xl font-bold">PageTurner</span>
//             </div>
//             <p className="text-gray-400 mb-6 max-w-md">
//               Your ultimate destination for discovering, purchasing, and enjoying amazing books. 
//               Join millions of readers who trust PageTurner for their literary adventures.
//             </p>
//             <div className="flex space-x-4">
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
//                 aria-label="Facebook"
//               >
//                 <Facebook className="w-5 h-5 text-blue-500" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
//                 aria-label="Instagram"
//               >
//                 <Instagram className="w-5 h-5 text-pink-500" />
//               </a>
//               <a
//                 href="#"
//                 className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
//                 aria-label="Twitter"
//               >
//                 <Twitter className="w-5 h-5 text-sky-400" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-3 text-gray-400">
//               <li><a href="#" className="hover:text-white transition-colors">Browse Books</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Bestsellers</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Authors</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Book Reviews</a></li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Support</h3>
//             <ul className="space-y-3 text-gray-400">
//               <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-400 text-sm">
//             &copy; {new Date().getFullYear()} PageTurner. All rights reserved.
//           </p>
//           <div className="flex space-x-6 mt-4 md:mt-0">
//             <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
//             <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
//             <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


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
            © {new Date().getFullYear()} BookSaw. All rights reserved.
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
