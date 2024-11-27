import axios from "../axios-config";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "./AddMemory.css";

const AddMemory = () => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", inputs.title);
    formData.append("description", inputs.description);

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      
      toast.success(response.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setImage(event.target.files[0]);
    } else {
      setInputs({ ...inputs, [event.target.name]: event.target.value });
    }
  }

  return (
    <div className="add-memory-page">
      <h2>Create a new memory</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Title</p>
          <input
            type="text"
            name="title"
            placeholder="Set a title"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Description</p>
          <textarea
            name="description"
            placeholder="Explain your memory"
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          <p>Photo</p>
          <input
            type="file"
            name="image"
            onChange={handleChange}
          />
        </label>
        <input type="submit" className="btn" value="Submit" />
      </form>
    </div>
  )
}

export default AddMemory;