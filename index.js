require("./config/config");
const connect = require("./connection");
const express = require("express");
const { listEvent } = require("./utils/indexer");
const cors = require("cors");
const DscinfoRouter = require("./routers/DscinfoRoutes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const PORT = 1414;
// dfsjdws

app.use("/api", DscinfoRouter);
connect()
  .then((res) => {
    app.listen(PORT, async function () {
      console.log("Server Listening on Port " + PORT);
      await listEvent();
    });
  })
  .catch((e) => {
    console.log(e, "Error in connection");
  });
