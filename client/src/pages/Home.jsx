import HomeStatus from "../components/common/HomeStatus"
import Swal from "sweetalert2";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // adjust path
import Homeadd from "../components/common/Homeadd";

const HomeSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);  //  moved INSIDE component

   // 🔔 SweetAlert – Bookstore style




const handleClick = () => {
  if (!user) {
    Swal.fire({
      title: "📚 Members Only",
      html: `
        <p style="font-size:12px; color:#57534e; line-height:1.6;">
          Please log in or create an account to explore our book collection
          and continue your reading journey.
        </p>
      `,
      showCancelButton: true,
      confirmButtonText: "Login / Register",
      cancelButtonText: "Maybe Later",
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#a8a29e",
      background: "#fafaf9",
      color: "#292524",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/register");
      }
    });

    return;
  }

  // ✅ correct role-based navigation
  if (user.role?.toLowerCase() === "admin") {
    navigate("/adminpage");
  } else {
    navigate("/products");
  }
};







const books = [
  {
    title: "Life of the Wild",
    author: "Sanchit Howey",
    description:
      "An evocative journey into untamed landscapes where nature speaks louder than words. This book explores survival, instinct, and the quiet beauty of the wild.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
  },
  {
    title: "Ocean Depths",
    author: "Marina Clarke",
    description:
      "Descend into the mysterious world beneath the waves. A poetic exploration of marine life, hidden ecosystems, and the timeless pull of the sea.",
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  },
  {
    title: "Mountain Tales",
    author: "Ridge Mountain",
    description:
      "A collection of inspiring stories set among towering peaks and silent valleys. Perfect for readers who dream of adventure and self-discovery.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
  },
  {
    title: "Whispers of the Library",
    author: "Elena Fairchild",
    description:
      "Every book holds a secret. This gentle narrative weaves together forgotten manuscripts, quiet rooms, and the magic hidden between pages.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
  },
  {
    title: "Midnight Reader",
    author: "Arthur Lane",
    description:
      "A love letter to night readers and endless stories. Follow a solitary reader as books become companions in the stillness of midnight.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
  },
];



  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + books.length) % books.length);
  };

  return (
    <>
      <section className="relative bg-stone-100 py-5 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-row md:flex-row items-center justify-between gap-1 ">
            {/* Left Content */}
            <div className="flex-1 max-w-xl ">
              <h1 className="text-3xl md:text-7xl font-serif font-light text-stone-800 mb-6 leading-tight">
                {books[currentSlide].title}
              </h1>
              <p className="text-stone-600 mb-8 text-1 leading-relaxed">
                {books[currentSlide].description}
              </p>
              <button
                onClick={handleClick}
                className="group flex items-center gap-3 px-8 py-3 border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition-all duration-300"
              >
                <span className="font-medium tracking-wider text-sm">
                  READ MORE
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Book Display */}
            <div className="flex-1 relativen ">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-white shadow-2xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={books[currentSlide].image}
                    alt={books[currentSlide].title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 shadow-lg">
                  <p className="text-xs text-stone-600">
                    • {books[currentSlide].author}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="flex gap-2">
              {books.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-stone-900 w-8"
                      : "bg-stone-400 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Homeadd />

      <HomeStatus/>
    </>
  );
};

export default HomeSection;
