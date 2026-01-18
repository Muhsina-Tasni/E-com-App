

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { registerUser } from "../../api/authApi";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(form);

      Swal.fire({
        toast: true,
        position: "top",
        timer: 3000,
        showConfirmButton: false,
        icon: "success",
        title: "Account created successfully 📚",
      });

      navigate("/login");
    } catch (err) {
      Swal.fire({
        title: "Registration Failed",
        text: err?.message || "Please try again",
        icon: "error",
      });
    }
  };

  return (
    <section className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-stone-200 shadow-xl p-10 my-10">
        
        {/* Heading */}
        <h2 className="text-3xl font-serif text-stone-800 text-center mb-2">
          Join Our Library
        </h2>
        <p className="text-center text-stone-500 mb-8">
          Create your account to explore timeless books
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 ">
          <input
            required
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border-b border-stone-300 px-4 py-1 text-sm focus:outline-none focus:border-amber-600"
          />

          <input
            required
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-stone-300 px-4 py-1 text-sm focus:outline-none focus:border-amber-600"
          />

          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border-b border-stone-300 px-4 py-1 text-sm focus:outline-none focus:border-amber-600"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border-b border-stone-300 px-4 py-1 text-sm bg-white focus:outline-none focus:border-amber-600"
          >
            <option value="user">Reader</option>
            <option value="admin">Admin</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 border border-amber-600 text-amber-600 py-1 hover:bg-amber-600 hover:text-white transition-all duration-300"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-8 text-stone-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-amber-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
