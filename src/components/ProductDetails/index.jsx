export function ProductDetails(props) {
  const { product } = props;

  if (!product.creator) {
    return <h1>Loading</h1>;
  }

  return (
    <section className="container flex flex-row justify-center items-center mx-auto mt-5 py-5 w-11/12 bg-slate-100 border border-indigo-400 rounded-xl">
      <div className="w-1/2 p-auto border-r-2 border-slate-200 flex justify-center items-center">
        <img src={product.picture} alt="Food appearence" className="w-96" />
      </div>
      <div className="w-1/2 pl-10">
        <ul>
          <li>
            <span className="font-semibold">- Name: </span>
            {product.name}
          </li>
          <li>
            <span className="font-semibold">- Price:</span>
            {` R$${Math.floor(product.price / 100)},${
              String(product.price)[String(product.price).length - 2]
            }${String(product.price)[String(product.price).length - 1]}`}
          </li>
          <li>
            <span className="font-semibold">- Business name:</span>{" "}
            {product.creator.name}
          </li>
          <li>
            <span className="font-semibold">- Business neighborhood:</span>{" "}
            {product.creator.name}
          </li>
          <li>
            <span className="font-semibold">- Business address:</span>{" "}
            {product.creator.name}
          </li>
          <li>
            <span className="font-semibold">- Description:</span>{" "}
            {product.description}
          </li>
        </ul>
      </div>
    </section>
  );
}