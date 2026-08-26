// import { useEffect, useState } from "react";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Swal from "sweetalert2";

// import { verifyPayment } from "../../api/paymentApi";

// const PaymentSuccess = () => {

//   const navigate = useNavigate();

//   const [searchParams] =
//     useSearchParams();

//   const [loading, setLoading] =
//     useState(true);



//   const hasProcessed = useRef(false);



//   useEffect(() => {
//     if (hasProcessed.current) {
//       return;
//     }

//     hasProcessed.current = true;

//     const processPayment = async () => {
//       try {
//         const sessionId =
//           searchParams.get("session_id");

//         if (!sessionId) {
//           throw new Error(
//             "Payment session not found"
//           );
//         }

//         const result =
//           await verifyPayment(sessionId);

//         console.log(
//           "Payment verification result:",
//           result
//         );

//         // Clear cart only after successful verification
//         localStorage.removeItem("cartItems");

//         await Swal.fire({
//           icon: "success",
//           title: "Payment Successful!",
//           text:
//             "Your order has been placed successfully.",
//           confirmButtonText:
//             "View My Orders",
//         });

//         navigate("/orders");
//       } catch (error) {
//         console.error(
//           "Payment success error:",
//           error
//         );

//         await Swal.fire({
//           icon: "error",
//           title:
//             "Payment Verification Failed",
//           text:
//             error?.response?.data?.message ||
//             error?.message ||
//             "We could not verify your payment.",
//         });

//         navigate("/cart");
//       } finally {
//         setLoading(false);
//       }
//     };

//     processPayment();
//   }, [searchParams, navigate]);

//   if (loading) {


//   // useEffect(() => {
//   //   if (hasProcessed.current) {
//   //     return;
//   //   }

//   // useEffect(() => {

//   //   const processPayment = async () => {

//   //     try {

//   //       const sessionId =
//   //         searchParams.get("session_id");

//   //       if (!sessionId) {
//   //         throw new Error(
//   //           "Payment session not found"
//   //         );
//   //       }

//   //       const result =
//   //         await verifyPayment(sessionId);

//   //       /*
//   //        * Payment is verified and
//   //        * order has been saved.
//   //        */

//   //       localStorage.removeItem(
//   //         "cartItems"
//   //       );

//   //       await Swal.fire({
//   //         icon: "success",
//   //         title: "Payment Successful!",
//   //         text:
//   //           "Your order has been placed successfully.",
//   //         confirmButtonText:
//   //           "View My Orders",
//   //       });

//   //       navigate("/orders");

//   //     } catch (error) {

//   //       console.error(
//   //         "Payment success error:",
//   //         error
//   //       );

//   //       await Swal.fire({
//   //         icon: "error",
//   //         title: "Payment Verification Failed",
//   //         text:
//   //           error?.message ||
//   //           "We could not verify your payment.",
//   //       });

//   //       navigate("/cart");

//   //     } finally {

//   //       setLoading(false);

//   //     }
//   //   };

//   //   processPayment();

//   // }, [searchParams, navigate]);


//   // if (loading) {

//     return (
//       <div className="min-h-screen flex items-center justify-center">

//         <div className="text-center">

//           <div className="text-2xl font-semibold">
//             Confirming your payment...
//           </div>

//           <p className="text-gray-500 mt-2">
//             Please wait.
//           </p>

//         </div>

//       </div>
//     );
//   }

//   return null;
// };

// export default PaymentSuccess;


import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { verifyPayment } from "../../api/paymentApi";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);

  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;

    const processPayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          throw new Error("Payment session not found");
        }

        console.log(
          "Verifying Stripe session:",
          sessionId
        );

        const result = await verifyPayment(sessionId);

        console.log(
          "Payment verification result:",
          result
        );

        // Stripe payment verified
        // Backend has already cleared MongoDB cart

        localStorage.removeItem("cartItems");

        await Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your order has been placed successfully.",
          confirmButtonText: "View My Orders",
        });

        navigate("/orders");

      } catch (error) {
        console.error(
          "Payment success error:",
          error
        );

        await Swal.fire({
          icon: "error",
          title: "Payment Verification Failed",
          text:
            error?.response?.data?.message ||
            error?.message ||
            "We could not verify your payment.",
        });

        navigate("/cart");

      } finally {
        setLoading(false);
      }
    };

    processPayment();

  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold">
            Confirming your payment...
          </div>

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