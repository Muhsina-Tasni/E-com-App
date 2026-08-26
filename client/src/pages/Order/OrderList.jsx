import { useEffect, useState } from "react";
import { getUserOrders } from "../../api/orderApi";

const OrderList = () => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data =
          await getUserOrders();

        setOrders(data || []);

      } catch (error) {

        console.error(
          "Failed to load orders:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchOrders();

  }, []);


  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading orders...
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-stone-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="bg-white p-8 rounded-lg shadow text-center">

            <p className="text-gray-500">
              You haven't placed any orders yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-medium">
                      {order._id}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p>
                      {new Date(
                        order.orderDate
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span className="inline-block mt-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      {order.status}
                    </span>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="font-bold text-lg">
                      ₹
                      {Number(
                        order.totalAmount
                      ).toFixed(2)}
                    </p>

                  </div>

                </div>

                <div className="border-t mt-5 pt-5">

                  <p className="font-semibold mb-2">
                    Delivery Address
                  </p>

                  <p className="text-gray-600">
                    {order.shippingAddress.street}
                  </p>

                  <p className="text-gray-600">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                  </p>

                  <p className="text-gray-600">
                    {order.shippingAddress.country} -{" "}
                    {order.shippingAddress.pincode}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
};

export default OrderList;