import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { verifyPayment } from "../../api/paymentApi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        console.log("Session ID:", sessionId);

        if (!sessionId) {
          throw new Error("Payment session not found");
        }

        // Verify payment with backend
        const response = await verifyPayment(sessionId);

        console.log("Payment verification:", response);

        if (response.success) {

          // Clear localStorage cart
          localStorage.removeItem("cartItems");

          // SweetAlert
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your order has been placed successfully.",
            confirmButtonText: "Continue Shopping",
            confirmButtonColor: "#16a34a",
          });

          // Go to products
          navigate("/products", {
            replace: true,
          });

        } else {
          throw new Error(
            response.message || "Payment verification failed"
          );
        }

      } catch (error) {
        console.error(
          "Payment verification error:",
          error
        );

        await Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong.",
          confirmButtonText: "Go to Cart",
        });

        navigate("/cart", {
          replace: true,
        });

      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>

          <h2 className="text-xl font-semibold">
            Verifying your payment...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait.
          </p>

        </div>

      </div>
    );
  }

  return null;
};

export default PaymentSuccess;