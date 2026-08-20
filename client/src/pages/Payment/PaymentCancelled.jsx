import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md text-center">

        <div className="text-red-500 text-5xl mb-4">
          ✕
        </div>

        <h1 className="text-2xl font-bold">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mt-2 mb-6">
          Your payment was cancelled.
        </p>

        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Return to Cart
        </button>

      </div>

    </div>
  );
};

export default PaymentCancelled;