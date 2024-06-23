import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col mt-8">
      <section className="mb-8 flex flex-row">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg border-b-2 ${activeTab === 1 ? "font-bold border-blue-500" : "border-transparent"
            }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg border-b-2 ${activeTab === 2 ? "font-bold border-blue-500" : "border-transparent"
            }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg border-b-2 ${activeTab === 3 ? "font-bold border-blue-500" : "border-transparent"
            }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-4">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full md:w-3/4 text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-4">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>

                  <textarea
                    id="comment"
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full md:w-3/4 text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please <Link to="/login" className="text-blue-500 underline">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="mt-4">
            {product.reviews.length === 0 && <p>No Reviews</p>}
            <div>
              {product.reviews.map((review) => (
                <div key={review._id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
                  <div className="flex justify-between mb-2">
                    <strong className="text-gray-800">{review.name}</strong>
                    <p className="text-gray-600">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <Ratings value={review.rating} color="red-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <SmallProduct key={product._id} product={product} />
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
