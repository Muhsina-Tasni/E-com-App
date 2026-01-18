import React from "react";

const stats = [
  { label: "Books Available", value: "12,000+" },
  { label: "Happy Readers", value: "5,400+" },
  { label: "Authors Featured", value: "320+" },
  { label: "Average Rating", value: "4.8 ★" },
];

const HomeStats = () => {
  return (
    <section className="bg-white border-t border-b">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((item, index) => (
            <div key={index} className="group">
              <h2 className="text-4xl font-serif font-bold text-stone-800 mb-2 group-hover:text-amber-600 transition">
                {item.value}
              </h2>
              <p className="text-sm uppercase tracking-widest text-stone-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
