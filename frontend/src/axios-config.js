import axios from "axios";

// Set axios base URL
axios.defaults.baseURL = "http://localhost:3000/";

// Set JSON as content type application
axios.defaults.headers.post["Content-Type"] = "application/json";

// Set timout to requests
axios.defaults.timeout = 10000;

export default axios;
