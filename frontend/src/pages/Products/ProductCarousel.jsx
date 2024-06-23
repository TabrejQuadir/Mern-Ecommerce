import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetNewProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4 lg:block xl:block md:block ">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="relative xl:w-[40rem] lg:w-[40rem] md:w-[56rem] sm:w-[40rem] sm:block">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="product-slide rounded-lg overflow-hidden bg-white shadow-lg">
                <img
                  src={image}
                  alt={name}
                  className="w-full object-contain h-[25rem] transition-transform transform hover:scale-105"
                />

                <div className="product-details p-6">
                  <div className="flex justify-between items-center mb-4">
                  <h2 className="product-name text-3xl font-bold text-gray-900 hover:text-pink-500">
                      <Link to={`/product/${_id}`}>{name}</Link>
                    </h2>
                    <p className="product-price text-pink-600 text-2xl font-bold">${price}</p>
                  </div>
                  <p className="product-description text-lg text-gray-600 mb-6">{description.substring(0, 70)} ...</p>
                  <div className="product-info grid grid-cols-2 gap-4 ">
                    <div className="info-section flex items-center">
                      <FaStore className="info-icon text-blue-500 mr-2" />
                      <span className="info-text text-gray-700">Brand: {brand}</span>
                    </div>
                    <div className="info-section flex items-center">
                      <FaClock className="info-icon text-blue-500 mr-2" />
                      <span className="info-text text-gray-700">Added: {moment(createdAt).fromNow()}</span>
                    </div>
                    <div className="info-section flex items-center">
                      <FaStar className="info-icon text-blue-500 mr-2" />
                      <span className="info-text text-gray-700">Reviews: {numReviews}</span>
                    </div>
                    <div className="info-section flex items-center">
                      <FaStar className="info-icon text-blue-500 mr-2" />
                      <span className="info-text text-gray-700">Ratings: {Math.round(rating)}</span>
                    </div>
                    <div className="info-section flex items-center">
                      <FaShoppingCart className="info-icon text-blue-500 mr-2" />
                      <span className="info-text text-gray-700">Quantity: {quantity}</span>
                    </div>
                    <div className="info-section flex items-center">
                      <FaBox className="info-icon text-blue-500 mr-2" />
                      <span className="info-text text-gray-700">In Stock: {countInStock}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
