import { useContext, useEffect, useState, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";
import { ClientNavBar } from "../../components/ClientNavBar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Profile() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [reload, setReload] = useState(false);
  const [img, setImg] = useState("");
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    neighborhood: "",
    cpf: "",
    contactPhone: "",
  });

  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await api.get("/api/user/get");
        setForm(response.data);
        setOrder(response.data.order);

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchForms();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload() {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);
      const response = await api.post("/api/uploadImage", uploadData);
      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("antes do handleupload");
      const imgURL = await handleUpload();
      console.log("depois do handle");
      await api.put("/api/user/edit", { ...form, picture: imgURL });
      console.log("depois do put");
      toast.success("Alterations saved!");
      navigate("/user/viewProfile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong... please try again.");
    }
  }

  function handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/");
  }

  async function handleDeleteUser(e) {
    try {
      await api.delete("/api/user/delete");
      localStorage.removeItem("loggedInUser");
      setLoggedInUser(null);
      toast.success("User deleted.");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong... please try again.");
    }
  }

  return (
    <>
      <ClientNavBar />
      <div className="container pb-6 mb-0 px-20">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="pt-8">
              <div>
                <img
                  src={form.picture}
                  className="w-56 h-56 rounded-full mb-5 border-4 border-black"
                ></img>
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Your Profile Picture:
                </h3>
                {/* 
                <label htmlFor="formImg">Your Profile Picture:</label> */}
                <input
                  name="picture"
                  type="file"
                  id="picture"
                  onChange={handleImage}
                />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.name}
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone number:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.contactPhone}
                      type="text"
                      name="contactPhone"
                      id="contactPhone"
                      autoComplete="contact-phone"
                      className="focus:ring-inest block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address:
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.email}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street address
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.address}
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="neighborhood"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Neighbordhood
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.neighborhood}
                      type="text"
                      name="neighborhood"
                      id="neighborhood"
                      autoComplete="address-neighborhood"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CPF{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      onChange={handleChange}
                      value={form.cpf}
                      type="text"
                      name="cpf"
                      id="cpf"
                      autoComplete="cpf"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end gap-6">
              <button
                onClick={handleSubmit}
                type="button"
                className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Save
              </button>

              <button
                onClick={handleLogOut}
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log out
              </button>
              <button
                onClick={handleDeleteUser}
                type="button"
                className="btn-indigo bg-black hover:bg-gray-800"
              >
                Delete account
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
