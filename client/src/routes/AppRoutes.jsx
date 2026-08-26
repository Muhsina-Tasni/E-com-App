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
import AIRecommendation from "../components/AIRecommendation"
import OrderList from "../pages/Order/OrderList";
import Checkout from "../pages/Order/Checkout"
import PaymentSuccess from "../pages/Payment/paymentSuccess";

const AppRoutes = () => {
  return (
    
   
    <BrowserRouter>
       <Navbar/>
      <Routes>
       <Route index element={<Home/>} />
        {/* Public */}
       

<Route
  path="/ai-recommendations"
  element={<AIRecommendation />}
/>



        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

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

<Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>

<Route
  path="/payment-success"
  element={
    <ProtectedRoute>
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>




<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <OrderList />
    </ProtectedRoute>
  }
/>


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

<Route path="admin/categories"
          element={
            <ProtectedRoute>
            <CategoryManager/>
            </ProtectedRoute>
          }
        />

      </Routes>
   <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
