import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const AdminProductUpdate = () => {
  const params = useParams();

  const { data: productData , refetch } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();

  const [updateProduct] = useUpdateProductMutation();

  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Validate inputs
  if (!image || !name || !price || !quantity || !brand || !description || !stock || !category) {
    toast.error("All fields are required");
    return;
  }

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error(data.error, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success("Product successfully updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      toast.error("Product update failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate("/admin/allproductslist");
    } catch (err) {
      toast.error("Delete failed. Try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-6 bg-black text-white rounded-lg shadow-lg">
          <div className="text-2xl font-semibold mb-6">Update / Delete Product</div>

          {image && (
            <div className="text-center mb-6">
              <img
                src={image}
                alt="product"
                className="block mx-auto  h-auto max-h-60 object-contain rounded-md shadow-md"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold bg-blue-500 hover:bg-blue-600">
              {image ? "Update image" : "Upload image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
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

            <label htmlFor="description" className="block my-5">Description</label>
            <textarea
              type="text"
              className="p-4 w-full border rounded-lg bg-gray-800 text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="stock" className="block mb-2">Count In Stock</label>
                <input
                  type="text"
                  className="p-4 w-full border rounded-lg bg-gray-800 text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category" className="block mb-2">Category</label>
                <select
                  className="p-4 w-full cursor-pointer border rounded-lg bg-gray-800 text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition-all duration-300 ease-in-out"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-4 px-10 rounded-lg text-lg font-bold bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
