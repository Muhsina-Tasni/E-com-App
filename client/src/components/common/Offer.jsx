import React from "react";
import { useNavigate } from "react-router-dom";

// Dummy offer data
const offers = [
  {
    id: 1,
    title: "🎉 New Year Reading Sale",
    description: "Flat 30% OFF on bestsellers",
    code: "NEWYEAR30",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
  {
    id: 2,
    title: "📘 Student Saver Deal",
    description: "Get extra 15% off with valid student email",
    code: "STUDENT15",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    id: 3,
    title: "📦 Free Delivery Offer",
    description: "Free delivery on all orders above ₹399",
    code: "FREESHIP",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    id: 4,
    title: "📚 Buy 2 Get 1 Free",
    description: "Select fiction books only",
    code: "B2G1FREE",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
  },
];

const OfferPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="uppercase tracking-widest text-xs text-stone-500 mb-2">
          Special Offers
        </p>
        <h2 className="text-4xl font-serif font-bold text-stone-800 mb-4">
          Grab Your Deals
        </h2>
        <p className="text-stone-500 max-w-xl mx-auto">
          Don’t miss out on our latest promotions. Save big on your favorite books!
        </p>
      </section>

      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white border border-stone-200 shadow-sm rounded-lg overflow-hidden w-full max-w-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => alert(`Use Code: ${offer.code}`)} // Replace with actual action
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-serif text-lg text-stone-800 mb-2">
                  {offer.title}
                </h3>
                <p className="text-stone-500 mb-3">{offer.description}</p>
                <span className="text-sm text-amber-600 font-semibold">
                  Code: {offer.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OfferPage;
