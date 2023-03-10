import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";
import toast from "react-hot-toast";

export function BusinessOrderDetail() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await api.get(`/api/order/get/${params.orderId}`);
        console.log("response.data below:");
        console.log(response.data);
        setOrder(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrder();
  }, [reload]);

  async function changeOrderStatus(event) {
    try {
      if (
        ["CANCELED", "CONCLUDED", "REJECTED BY COMPANY"].includes(order.status)
      ) {
        toast.error(`Product already ${order.status}`);
      } else {
        await api.put(`/api/order/edit/status/${params.orderId}`, {
          status: event.target.value,
        });
        setReload(!reload);
        toast.success("Status updated!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <BusinessNavBar />
      <div className="mt-6 mx-auto py-12 flex flex-col gap-8 items-center bg-white/90 rounded-md w-1/2 drop-shadow-2xl shadow-black">
        <h1 className="text-center text-5xl underline mb-2">Order details:</h1>
        {!isLoading && (
          <>
            <section>
              <div className="text-sm">
                <h2>
                  <span className="font-semibold">- Product: </span>
                  {order.product.name}.
                </h2>
                <ul>
                  <li>
                    <span className="font-semibold">- Business: </span>
                    {order.business.name}.
                  </li>
                  <li>
                    <span className="font-semibold">- Client: </span>
                    {order.client.name}.
                  </li>
                  <li>
                    <span className="font-semibold">- Price: </span>
                    {`R$ ${Math.floor(order.product.price / 100)},${
                      String(order.product.price)[
                        String(order.product.price).length - 2
                      ]
                    }${
                      String(order.product.price)[
                        String(order.product.price).length - 1
                      ]
                    }`}
                    .
                  </li>
                  <li className="w-96 flex flex-row justify-start items-start flex-nowrap">
                    <h3 className="font-semibold w-64">- Description: </h3>
                    <p className="italic text-sm">
                      {order.product.description}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="flex flex-row justify-center">
                <h3 className="mt-6 font-bold text-2xl">
                  <span>Status: </span>
                  {order.status}.
                </h3>
              </div>
            </section>
            <div className="flex flex-row gap-6 m-2">
              <button
                value="REJECTED BY COMPANY"
                onClick={changeOrderStatus}
                className="btn-indigo bg-red-500 shadow-lg hover:bg-red-600"
              >
                Reject Order
              </button>
              <button
                value="CONFIRMED BY COMPANY"
                onClick={changeOrderStatus}
                className="btn-indigo shadow-lg"
              >
                Confirm Order
              </button>
              <button
                value="CONCLUDED"
                onClick={changeOrderStatus}
                className="btn-indigo bg-green-500 shadow-lg hover:bg-green-600"
              >
                Mark as concluded
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
