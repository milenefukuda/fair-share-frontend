import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Aqui faltam btns para fazer softdelete nas orders antigas.

export function BusinessAdmin() {
  const [myOrders, setMyOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true),
    [reload, setReload] = useState(false),
    navigate = useNavigate();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response1 = await api.get("/api/order/get/myOrders");
        const response2 = await api.get("/api/product/get/myProducts");
        setMyOrders(response1.data);
        setMyProducts(response2.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrder();
  }, [reload]);

  async function handleDelete(e) {
    try {
      await api.delete(`/api/order/delete/${e.target.value}`);
      console.log("Deleted");
      setReload(!reload);
      console.log("Reloaded");
      toast.success("Order deleted.");
    } catch (err) {
      console.log(err);
    }
  }

  function handleNavigateProduct(e) {
    try {
      navigate(`/business/admin/viewMagic/${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  }

  function handleNavigateOrder(e) {
    try {
      navigate(`/business/admin/viewOrder/${e.target.value}`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(myOrders);
  console.log(myProducts);

  return (
    <div className="min-h-screen w-screen mb-0">
      <BusinessNavBar />
      <div className="flex flex-row justify-center h-40 bg-white rounded drop-shadow-lg flex justify-center gap-20 items-end pb-12 px-16 border-b-4 border-indigo-900 w-10/12 mx-auto mb-4">
        <h1 className="text-6xl text-indigo-900">Admin Page</h1>
      </div>
      {!isLoading && (
        <div className="container border-none flex flex-col items-center w-screen">
          <section className="w-10/12">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold pl-4">
              My orders
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6 h-80 flex flex-col items-center justify-between mx-auto flex-nowrap gap-8 mt-5 py-5">
              {!isLoading &&
                myOrders.orders
                  .filter(
                    (currentOrder) =>
                      currentOrder.status !== "CANCELED" &&
                      currentOrder.status !== "CONCLUDED" &&
                      currentOrder.status !== "REJECTED BY COMPANY"
                  )
                  .map((currentOrder) => {
                    return (
                      <article
                        className="w-11/12 max-h-full flex flex-row flex-wrap items-center justify-between px-4 border-b-2 pb-6"
                        key={currentOrder._id}
                      >
                        <div className="w-2/10 flex flex-row justify-center">
                          <img
                            src={currentOrder.product.picture}
                            alt="Product"
                            className="w-24 h-24 rounded-full max-h-full"
                          />
                        </div>
                        <div className="w-3/10 flex flex-row justify-start">
                          <ul>
                            <li>
                              <span className="font-semibold">- Client: </span>
                              {currentOrder.client.name}
                            </li>
                            <li>
                              <span className="font-semibold">- Product: </span>
                              {currentOrder.product.name}
                            </li>
                            <li>
                              <span className="font-semibold">- Price:</span>{" "}
                              {`R$ ${Math.floor(
                                currentOrder.product.price / 100
                              )},${
                                String(currentOrder.product.price)[
                                  String(currentOrder.product.price).length - 2
                                ]
                              }${
                                String(currentOrder.product.price)[
                                  String(currentOrder.product.price).length - 1
                                ]
                              }`}
                            </li>
                          </ul>
                        </div>
                        <div className="w-36 flex justify-start flex-wrap">
                          <h2 className="w-11/12 font-bold font-color-gray-200">
                            <span className="font-semibold">Status: </span>
                            {currentOrder.status}
                          </h2>
                        </div>
                        <div className="w-2/10">
                          <button
                            value={currentOrder._id}
                            className="btn-indigo"
                            onClick={handleNavigateOrder}
                          >
                            View
                          </button>
                        </div>
                      </article>
                    );
                  })}
            </div>
          </section>
          <section className="w-10/12">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold pl-56">
              My Products
            </h2>
            <div className="h-80 overflow-auto bg-slate-200/80 rounded-xl border-2 mt-2 mb-6 flex flex-col items-center justify-between mx-auto flex-nowrap gap-8 mt-5 py-5">
              {!isLoading &&
                myProducts.map((currentProduct) => {
                  return (
                    <article
                      className={`w-11/12 max-h-full flex flex-row flex-wrap items-center justify-between px-4 border-b-2 border-b-indigo-600/20 pb-6`}
                      key={currentProduct._id}
                    >
                      <div className="w-1/3 flex flex-row justify-center">
                        <img
                          src={currentProduct.picture}
                          alt="Product"
                          className="w-24 h-24 rounded-full max-h-full"
                        />
                      </div>
                      <div className="w-1/3 flex flex-row justify-start pl-12">
                        <ul>
                          <li>
                            <span className="font-semibold">- Product: </span>
                            {currentProduct.name}
                          </li>
                          <li>
                            <span className="font-semibold">- Price:</span>{" "}
                            {`R$ ${Math.floor(currentProduct.price / 100)},${
                              String(currentProduct.price)[
                                String(currentProduct.price).length - 2
                              ]
                            }${
                              String(currentProduct.price)[
                                String(currentProduct.price).length - 1
                              ]
                            }`}
                          </li>
                        </ul>
                      </div>
                      <div className="w-1/3 flex flex-row justify-center">
                        <button
                          value={currentProduct._id}
                          className="btn-indigo"
                          onClick={handleNavigateProduct}
                        >
                          View
                        </button>
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
          <section className="w-10/12 mb-0">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold text-center">
              History
            </h2>
            <div className="h-80 overflow-y-auto bg-gray-200 rounded-xl border-2 mt-2 mb-6 flex flex-col flex-nowrap items-center justify-between mx-auto flex-wrap gap-8 mt-5 py-5">
              {!isLoading &&
                myOrders.orders
                  .filter(
                    (currentOrder) =>
                      currentOrder.status == "CANCELED" ||
                      currentOrder.status == "CONCLUDED" ||
                      currentOrder.status == "REJECTED BY COMPANY"
                  )
                  .map((currentOrder) => {
                    return (
                      <article
                        className="w-11/12 max-h-full flex flex-row flex-wrap items-center justify-between px-4 border-b-2 border-gray-500 pb-6"
                        key={currentOrder._id}
                      >
                        <div className="w-2/10 flex flex-row justify-center">
                          <img
                            src={currentOrder.product.picture}
                            alt="Product"
                            className="w-24 h-24 rounded-full max-h-full"
                          />
                        </div>
                        <div className="w-3/10 flex flex-row justify-start">
                          <ul>
                            <li>
                              <span className="font-semibold">- Client: </span>
                              {currentOrder.client.name}
                            </li>
                            <li>
                              <span className="font-semibold">- Product: </span>
                              {currentOrder.product.name}
                            </li>
                            <li>
                              <span className="font-semibold">- Price:</span>{" "}
                              {`R$ ${Math.floor(
                                currentOrder.product.price / 100
                              )},${
                                String(currentOrder.product.price)[
                                  String(currentOrder.product.price).length - 2
                                ]
                              }${
                                String(currentOrder.product.price)[
                                  String(currentOrder.product.price).length - 1
                                ]
                              }`}
                            </li>
                          </ul>
                        </div>
                        <div className="w-36 flex justify-start flex-wrap">
                          <h2 className="w-11/12 font-bold font-color-gray-200">
                            <span className="font-semibold">Status: </span>
                            {currentOrder.status}
                          </h2>
                        </div>
                        <div className="w-2/10">
                          <button
                            value={currentOrder._id}
                            className="btn-indigo"
                            onClick={handleNavigateOrder}
                          >
                            View
                          </button>
                        </div>
                        <div className="w-1/10">
                          <button
                            value={currentOrder._id}
                            className="btn-indigo bg-red-400 hover:bg-red-500"
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    );
                  })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
