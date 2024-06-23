import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="main-content py-3 pr-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
