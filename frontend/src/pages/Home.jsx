import { Link, useParams, useLocation } from "react-router-dom";
import { useGetNewProductsQuery, useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import Offer from "../components/Offer";
import Notify from "../components/Notify";
// import Footer from "../components/Footer";

const Home = () => {
  const { keyword = '' } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useGetProductsQuery({ keyword, page });
  const { data: products } = useGetNewProductsQuery()

  if (isLoading) return <Loader />;
  if (isError) return <Message variant="danger">{isError?.data?.message || isError.error}</Message>;

  return (
    <>
      {!keyword && <Header />}
      <div className="min-h-screen  py-10 ">

        <Offer/>

        <div className="container mx-auto px-6">
          <div className="flex justify-between px-3 items-center pt-4 border-t-2 border-pink-500 mb-6">
            <h1 className="text-5xl font-bold font-sans text-yellow-400 tracking-wide">ALL Products</h1>
            <Link to="/shop" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full py-3 px-8 shadow-lg transform transition-transform duration-300 hover:scale-105">Sort By</Link>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {data.products.map((product) => (
              <div key={product._id} className="transform transition-transform duration-300 hover:scale-105">
                <Product product={product} />
              </div>
            ))}
          </div>
          <div className="flex justify-center my-3">
            {page > 1 && (
              <Link
                to={`/?${keyword ? `keyword=${keyword}&` : ''}page=${page - 1}`} // Conditionally include keyword parameter
                className="bg-gradient-to-r from-orange-400 to-pink-600 text-white font-bold rounded-full py-3 px-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Previous
              </Link>
            )}
            {data.hasMore && (
              <Link
                to={`/?${keyword ? `keyword=${keyword}&` : ''}page=${page + 1}`} // Conditionally include keyword parameter
                className="bg-gradient-to-r from-orange-400 to-pink-600 text-white font-bold rounded-full py-3 px-8 shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Next Page
              </Link>
            )}
          </div>

          <Notify/>

          <div className="flex justify-between items-center mb-12 px-3 pt-6 border-pink-500 border-t-2">
            <h1 className="text-5xl font-bold font-sans text-orange-500 tracking-normal">Latest Collection</h1>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product._id} className="transform transition-transform duration-300 hover:scale-100 scale-90">
                <Product product={product} />
              </div>
            ))}
          </div>


        </div>
        {/* <Footer/> */}
        
      </div>
    </>
  );
};

export default Home;
