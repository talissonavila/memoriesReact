import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import "react-toastify/ReactToastify.css";
import './App.css';


function App() {
  return (
    <div className="App">
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <Navbar/>
      <div className="container">
        <Outlet />
      </div>
      <Footer/>
    </div>
  )
}

export default App;
