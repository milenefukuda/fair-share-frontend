import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NameLogo } from "../../components/NameLogo";
import { api } from "../../api/api";
import { BusinessNavBar } from "../../components/BusinessNavBar";

export function BusinessProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [form, setForm] = useState({ expirationDate: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await api.get(`/api/product/get/${params.idProduct}`);
        console.log(response.data);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProduct();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit() {
    try {
      await api.put(`/api/product/edit/${product._id}`, form);
      setShowForm(false);
      setReload(!reload);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    await api.delete(`/api/product/delete/${params.idProduct}`);
    navigate("/business/admin");
  }

  // fazer inputs do form com value do form no handleChange
  return (
    <div className="pb-6">
      <BusinessNavBar />
      <section className="container flex flex-row justify-center items-center mx-auto mt-5 py-5 w-11/12 bg-slate-100 border-2 border-indigo-900 rounded-xl">
        <div className="w-1/2 p-auto border-r-2 border-slate-200 flex justify-center items-center">
          <img
            src={product.picture}
            alt="Food appearence"
            className="max-w-fit rounded-md shadow-black shadow-lg max-h-96"
          />
        </div>
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <ul>
            <li>
              <span className="font-semibold">- Name: </span>
              {product.name}.
            </li>
            <li>
              <span className="font-semibold">- Price:</span>
              {` R$${Math.floor(product.price / 100)},${
                String(product.price)[String(product.price).length - 2]
              }${String(product.price)[String(product.price).length - 1]}`}
              .
            </li>

            <li>
              <span className="font-semibold">- Description:</span>{" "}
              <span className="italic">{product.description}.</span>
            </li>
            <li>
              <span className="font-semibold">- Expiration date:</span>{" "}
              {product.expirationDate}.
            </li>
          </ul>
          <div className="mt-12 flex flex-row gap-8">
            <button
              className="btn-indigo bg-yellow-500 shadow-lg hover:bg-yellow-600"
              onClick={() => setShowForm(!showForm)}
            >
              Editar Produtos aqui
            </button>
            <button
              className="btn-indigo bg-red-500 shadow-lg shadow-lg hover:bg-red-600"
              onClick={handleDelete}
            >
              Excluir produto
            </button>
          </div>
        </div>
      </section>
      {showForm && (
        <div className="pl-12">
          <form className="pt-4 border-t-2 border-t-indigo-900">
            <h2 className="text-2xl font-bold underline mb-4 h-8 align-end pl-12 text-black/80 h-8">
              Edit:
            </h2>
            <label htmlFor="expirationDate" className="text-base pl-12">
              Set new expiration date:{" "}
            </label>
            <input
              id="expirationDate"
              name="expirationDate"
              type="date"
              value={form.expirationDate}
              onChange={handleChange}
              className="h-6"
            />
          </form>
          <button
            onClick={handleSubmit}
            type="button"
            className="btn-indigo ml-12 my-4"
          >
            Save
          </button>
          <footer className="text-xs italic mt-2">
            <p>
              Other types of changes are not allowed. Please make another
              product to change name, description, picture and price.
            </p>
          </footer>
        </div>
      )}
    </div>
  );
}
