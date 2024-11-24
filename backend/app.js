const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const memoryRoutes = require("./routes");

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

app.use("/memories", memoryRoutes);

const conn = require("./db/conn");
conn();

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Trying to connect to DB...`);
});
