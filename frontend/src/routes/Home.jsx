import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../axios-config";

import "./Home.css";

const Home = () => {
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const getMemories = async () => {
      const response = await axios.get("/memories");

      setMemories(response.data);
    };

    getMemories();
  }, []);

  return (
    <div className="home">
      <h2>Check out the last memories</h2>
      <div className="memories-container">
        {memories.length > 0 &&
          memories.map((memory) => (
            <div className="memory" key={memory._id}>
              <img
                src={`${axios.defaults.baseURL}${memory.src}`}
                alt={memory.title}
              />
              <p>{memory.title}</p>
              <Link className="btn" to={`/memories/${memory._id}`}>
                Comment
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
