import Offer from "../components/common/Offer"
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductList from "../pages/Products/ProductList";
import ProtectedRoute from "../routes/ProtectedRoutes";
import CartPage from "../pages/Cart/CartPage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home"
import ProductPage from "../pages/Products/ProductPage";
import CategoryManager from "../pages/Category/CategoryManager";
import UserProfile from "../pages/Users/Profile";
import PaymentPage from "../pages/Payment/PaymentPage";

const AppRoutes = () => {
  return (
    
   
    <BrowserRouter>
       <Navbar/>
      <Routes>
       <Route index element={<Home/>} />
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />




<Route path="/checkout" element={<PaymentPage />} />



<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  }
/>



<Route path="/offer"
          element={
            <ProtectedRoute>
              <Offer />
            </ProtectedRoute>
          }
        />



<Route path="/adminpage"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />



<Route path="/admin/categories"
          element={
            <ProtectedRoute>
            <CategoryManager/>
            </ProtectedRoute>
          }
        />

<Route path="/cart"
          element={
            <ProtectedRoute>
              <CartPage/>
            </ProtectedRoute>
          }
        />




      </Routes>
   <Footer/>
    </BrowserRouter>
    
   
  );
};

export default AppRoutes;
