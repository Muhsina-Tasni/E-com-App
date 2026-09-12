
import { useEffect, useState } from "react";
import { getAllOrders } from "../../api/adminApi";

const AdminOrders = () => {
console.log("🔥 ADMIN ORDERS PAGE LOADED");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data = await getAllOrders();


        console.log("All orders received:", data);

        setOrders(data || []);

      } catch (error) {

        console.error(
          "Failed to load all orders:",
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

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          All Orders
        </h1>


        {orders.length === 0 ? (

          <div className="bg-white p-8 rounded-lg shadow text-center">

            <p className="text-gray-500">
              No orders have been placed yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow"
              >

                {/* ORDER + CUSTOMER INFORMATION */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="font-medium break-all">
                      {order._id}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Customer
                    </p>

                    <p className="font-medium">
                      {order.user_id?.name ||
                        "Unknown reader"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.user_id?.email || ""}
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


                {/* ORDERED PRODUCTS */}

                <div className="border-t mt-5 pt-5">

                  <h2 className="font-semibold text-lg mb-4">
                    Ordered Products
                  </h2>


                  {order.orderItems &&
                  order.orderItems.length > 0 ? (

                    <div className="space-y-4">

                      {order.orderItems.map((item) => (

                        <div
                          key={item._id}
                          className="flex items-center gap-4 border rounded-lg p-4"
                        >

                          <img
                            src={
                              item.product_id?.image ||
                              "/placeholder.jpg"
                            }
                            alt={
                              item.product_id?.name ||
                              "Product"
                            }
                            className="w-20 h-24 object-cover rounded"
                          />


                          <div className="flex-1">

                            <h3 className="font-semibold">
                              {item.product_id?.name ||
                                "Product name unavailable"}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                              Quantity: {item.quantity}
                            </p>

                            <p className="text-gray-500 text-sm">
                              Price: ₹
                              {Number(
                                item.price
                              ).toFixed(2)}
                            </p>

                          </div>


                          <div className="text-right">

                            <p className="font-bold">
                              ₹
                              {(
                                Number(item.price) *
                                Number(item.quantity)
                              ).toFixed(2)}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  ) : (

                    <p className="text-gray-500">
                      No products found for this order.
                    </p>

                  )}

                </div>


                {/* DELIVERY ADDRESS */}

                <div className="border-t mt-5 pt-5">

                  <p className="font-semibold mb-2">
                    Delivery Address
                  </p>

                  <p className="text-gray-600">
                    {order.shippingAddress?.street}
                  </p>

                  <p className="text-gray-600">
                    {order.shippingAddress?.city},{" "}
                    {order.shippingAddress?.state}
                  </p>

                  <p className="text-gray-600">
                    {order.shippingAddress?.country} -{" "}
                    {order.shippingAddress?.pincode}
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

export default AdminOrders;

