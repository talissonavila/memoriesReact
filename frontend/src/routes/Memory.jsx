import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "../axios-config";

import "./Memory.css";

const Memory = () => {
  const { id } = useParams();
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const getMemory = async () => {
      const response = await axios.get(`/memories/${id}`);
      setMemory(response.data);
      setComments(response.data.comments);
    };
    getMemory();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const comment = {name, text}
      const response = await axios.patch(`/memories/${memory._id}/comment/`, comment);

      const lastComment = response.data.memory.comments.pop();
      setComments((comments) => [...comments, lastComment]);
      setName("");
      setText("");
      toast.success(response.data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }

  if (!memory) return <p>Loading...</p>

  return (
    <div className="memory-page">
      <img src={`${axios.defaults.baseURL}${memory.src}`} alt={memory.title} />
      <h2>{memory.title}</h2>
      <p>{memory.description}</p>
      <div className="comment-form">
        <h3>Add a comment here</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
            type="text" 
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            <textarea 
            placeholder="Your comment"
            value={text}
            onChange={(event) => setText(event.target.value)}
            ></textarea>
          </label>
          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
      <div className="comments-container">
        <h3>Comments ({comments.length})</h3>
          {comments.length === 0 && <p>No comments yet</p>}
          {comments.length > 0 &&
            comments.map((comment) => (
              <div className="comment" key={comment._id}>
                <p className="comment-name">{comment.name}</p>
                <p className="comment-text">{comment.text}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Memory;
