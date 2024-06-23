import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty: Number(qty) }));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 pb-12">
      <div className="mt-8 flex justify-between items-center">
        <Link to="/" className="text-blue-600 font-semibold hover:underline transition-colors duration-300">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="mt-8 flex flex-col md:flex-row bg-white shadow-xl rounded-2xl p-8 gap-8">
          <div className="md:w-1/2 relative">
            <img src={product.image} alt={product.name} className="w-full h-[32rem] object-contain rounded-xl shadow-lg transition-transform duration-500 hover:scale-105" />
            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
              <HeartIcon product={product} />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col my-auto">
            <div>
              <h2 className="text-5xl font-extrabold mb-4 text-gray-800">{product.name}</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
              <p className="text-5xl font-bold text-green-600 mb-6">${product.price}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="flex items-center text-gray-600"><FaStore className="mr-2 text-xl" /> Brand: {product.brand}</p>
                  <p className="flex items-center text-gray-600"><FaClock className="mr-2 text-xl" /> Added: {moment(product.createdAt).fromNow()}</p>
                </div>
                <div>
                  <p className="flex items-center text-gray-600"><FaStar className="mr-2 text-xl" /> Ratings: {product.rating}</p>
                  <p className="flex items-center text-gray-600"><FaShoppingCart className="mr-2 text-xl" /> In Stock: {product.countInStock}</p>
                </div>
              </div>

              <div className="mb-6">
                <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
              </div>
            </div>

            <div className="mt-6 flex items-center">
              {product.countInStock > 0 && (
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 transition-colors duration-300 mr-4"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`bg-gradient-to-r from-purple-500 to-pink-600 text-white py-2 px-6 rounded-lg transition-transform duration-300 ${product.countInStock === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-12">
        <ProductTabs
          loadingProductReview={loadingProductReview}
          userInfo={userInfo}
          submitHandler={submitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
