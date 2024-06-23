import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[20rem] mx-4 mb-8 p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain rounded-t-lg"
        />
        <HeartIcon product={product} className="absolute top-2 right-2" />
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center mb-2">
            <div className="text-xl font-semibold text-gray-900">{product.name.slice(0, 16)}..</div>
            <span className="bg-pink-200 text-pink-800 text-sm font-medium px-3 py-1 rounded-full">
              $ {product.price}
            </span>
          </h2>
        </Link>
        <p className="text-gray-600 mt-2">
          {product.description.slice(0, 30)}...
        </p>
      </div>
    </div>
  );
};

export default Product;
