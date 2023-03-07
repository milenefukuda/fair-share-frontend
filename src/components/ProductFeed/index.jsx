import { api } from "../../api/api.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ProductFeed(props) {
  const { search } = props;
  const [productFeed, setProductFeed] = useState([]);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await api.get("/api/product/get/all");
        setProductFeed(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllProducts();
  }, []);

  return (
    <section>
      {productFeed
        .filter(
          (cE) =>
            cE.name.toLowerCase().includes(search.toLowerCase()) ||
            cE.creator.neighborhood.toLowerCase().includes(search.toLowerCase())
        )
        .map((cE) => {
          return (
            <article>
              <img src={cE.picture} alt="Product appearence." />
              <h2>{cE.name}</h2>
              <p>{cE.creator.address}</p>
              <p>{cE.creator.neighborhood}</p>
              <Link to={`/user/viewMagic/${cE._id}`}>
                <button className="btn-indigo">See details</button>
              </Link>
            </article>
          );
        })}
    </section>
  );
}
