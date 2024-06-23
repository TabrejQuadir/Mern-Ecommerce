import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[16rem] h-[20rem] ml-[2rem] p-3 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-[14rem]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full rounded-t-lg object-contain"
        />
        <HeartIcon product={product} className="absolute top-4 right-4 text-red-600" />
      </div>

      <div className="p-4 flex flex-col justify-between h-[8rem]">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center text-gray-900 font-semibold hover:underline">
            <span className="truncate">{product.name}</span>
            <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
