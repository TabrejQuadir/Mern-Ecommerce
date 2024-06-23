import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateForm = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      errors.email = "Invalid email address";
      valid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.log('Attempting to login with:', email, password);
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || error.error);
    }
  }, [isError, error]);

  return (
    <div className="flex min-h-screen">
      <div className="md:flex md:flex-col md:justify-center md:w-1/2 p-10 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-pink-500 via-orange-500 to-sky-500">Sign In</span>
        </h1>
        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              id="email"
              className={`mt-1 p-3 border rounded w-full bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-pink-500 ${formErrors.email && 'border-red-500'}`}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className={`mt-1 p-3 border rounded w-full bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring focus:ring-pink-500 ${formErrors.password && 'border-red-500'}`}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-gradient-to-r from-pink-500 via-orange-500 to-sky-500 text-white px-4 py-3 rounded w-full hover:bg-gradient-to-r hover:from-pink-600 hover:via-orange-600 hover:to-sky-600 focus:outline-none focus:ring focus:ring-pink-500"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p className="text-sm">New Customer?{" "}
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="text-pink-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt="Sign In"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
