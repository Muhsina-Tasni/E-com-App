import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AdminStats = () => {
  const { token } = useContext(AuthContext);

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    inStock: 0,
    outOfStock: 0,
  });

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error("Error loading admin stats", error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <StatCard title="Total Products" value={stats.totalProducts} />
      <StatCard title="Categories" value={stats.totalCategories} />
      <StatCard title="In Stock" value={stats.inStock} />
      <StatCard title="Out of Stock" value={stats.outOfStock} />
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border border-stone-200 rounded-xl shadow-md p-6 text-center">
    <p className="text-stone-500 text-sm mb-1">{title}</p>
    <h3 className="text-4xl font-bold text-amber-600">{value}</h3>
  </div>
);

export default AdminStats;




