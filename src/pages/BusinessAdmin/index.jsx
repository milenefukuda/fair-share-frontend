import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

// Aqui faltam btns para fazer softdelete nas orders antigas.

export function BusinessAdmin() {
  const [myOrders, setMyOrders] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  //const [form, setForm] = useState([]);
  console.log(myOrders);
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
  }, []);

  console.log(myOrders);
  console.log(myProducts);

  return (
    <div className="min-h-screen w-screen mb-0">
      <BusinessNavBar />
      <div className="flex flex-row justify-center h-40 bg-white rounded drop-shadow-lg flex justify-center gap-20 items-end pb-12 px-16 border-b-4 border-indigo-900 w-10/12 mx-auto mb-4">
        <h1 className="text-6xl text-indigo-900">Admin Page</h1>
      </div>
      {/* <img
        src={form.picture}
        className="w-56 h-56 rounded-full mb-5 border-4 border-black"
      /> */}
      {!isLoading && (
        <div className="container border-none flex flex-col items-center w-screen">
          <section className="w-10/12">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold pl-4">
              My orders
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6 ml-2">
              {myOrders.orders
                .filter(
                  (currentOrder) =>
                    currentOrder.status !== "CANCELED" &&
                    currentOrder.status !== "CONCLUDED" &&
                    currentOrder.status !== "REJECTED BY COMPANY"
                )
                .map((currentOrder) => {
                  return (
                    <div key={currentOrder._id}>
                      <img
                        src={currentOrder.product.picture}
                        className="w-52 max-h-56"
                      />
                      <p>{currentOrder.client.name}</p>
                      <p>{currentOrder.product.name}</p>
                      <p className="font-bold">{currentOrder.status}</p>
                      <Link
                        to={`/business/admin/viewOrder/${currentOrder._id}`}
                      >
                        <button className="btn-indigo mb-2">
                          {" "}
                          Orders details{" "}
                        </button>{" "}
                      </Link>
                    </div>
                  );
                })}
            </div>
          </section>
          <section className="w-10/12">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold pl-56">
              My Products
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6">
              {myProducts.map((currentProduct) => {
                return (
                  <div key={currentProduct._id}>
                    <p className="font-bold">{currentProduct.name}</p>
                    <p>{`R$ ${Math.floor(currentProduct.price / 100)},${
                      String(currentProduct.price)[
                        String(currentProduct.price).length - 2
                      ]
                    }${
                      String(currentProduct.price)[
                        String(currentProduct.price).length - 1
                      ]
                    }`}</p>
                    <p>{currentProduct.description}</p>
                    <img
                      src={currentProduct.picture}
                      className="w-52 max-h-56"
                    />
                    <Link
                      to={`/business/admin/viewMagic/${currentProduct._id}`}
                    >
                      <button className="btn-indigo mt-2">Details</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="w-10/12 mb-0">
            <h2 className="border-b-2 border-b-indigo-900 text-2xl text-indigo-900 font-semibold text-center">
              History
            </h2>
            <div className="h-80 overflow-auto bg-white/80 rounded-xl border-2 mt-2 mb-6">
              {myOrders.orders
                .filter(
                  (currentOrder) =>
                    currentOrder.status == "CANCELED" ||
                    currentOrder.status == "CONCLUDED" ||
                    currentOrder.status == "REJECTED BY COMPANY"
                )
                .map((currentOrder) => {
                  return (
                    <div key={currentOrder._id}>
                      <img
                        src={currentOrder.product.picture}
                        className="mt-2 w-52 max-h-56"
                      />
                      <p>{currentOrder.client.name}</p>
                      <p>{currentOrder.product.name}</p>
                      <p className="font-bold">{currentOrder.status}</p>
                    </div>
                  );
                })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
