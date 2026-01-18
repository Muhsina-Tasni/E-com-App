
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import InputField from "../../components/forms/InputFields";
import Button from "../../components/common/Button";

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   try {
  //     await handleLogin(form);
  //     navigate("/products");
  //   } catch (err) {
  //     setError("Invalid credentials. Please try again.");
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const user = await handleLogin(form); // 👈 get user back

    // ✅ ROLE BASED REDIRECT
    if (user.role === "admin") {
      navigate("/adminpage");
    } else {
      navigate("/products");
    }
  } catch (err) {
    setError("Invalid credentials. Please try again.");
  }
};




  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white shadow-2xl p-10 border border-stone-200 my-10">
        
        {/* Heading */}
        <h2 className="text-3xl font-serif text-stone-800 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-stone-500 mb-8">
          Sign in to continue exploring books
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <InputField
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className="w-full border-b border-stone-300 px-1 py-1 focus:outline-none focus:border-amber-600"
          />

          {/* Password */}
          <InputField
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full border-b border-stone-300 px-1 py-1 focus:outline-none focus:border-amber-600"
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full mt-6 border border-amber-600 text-amber-600 py-1 hover:bg-amber-600 hover:text-white transition-all duration-300"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-8 text-stone-500">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-amber-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

