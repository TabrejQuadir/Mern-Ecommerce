import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Validate inputs
     if (!image || !name || !price || !quantity || !brand || !description || !stock || !category) {
      toast.error("All fields are required");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-36 sm:mx-4 my-8">
      <div className="flex flex-col md:flex-row gap-6">
        <AdminMenu />
        <div className="md:w-3/4 p-8 bg-gradient-to-r from-black to-gray-700 hover:from-gray-700 hover:to-black text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out">
          <div className="text-3xl font-semibold mb-6">Create Product</div>

          {imageUrl && (
            <div className="text-center mb-6">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-60 object-cover rounded-md shadow-md"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold bg-blue-500 hover:bg-blue-600 transition-all duration-300 ease-in-out">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2">Name</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="price" className="block mb-2">Price</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="brand" className="block mb-2">Brand</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block mb-2">Description</label>
              <textarea
                type="text"
                className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="stock" className="block mb-2">Count In Stock</label>
                <input
                  type="number"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2">Category</label>
                <select
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="py-4 px-10 mt-5 w-full rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition-all duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
