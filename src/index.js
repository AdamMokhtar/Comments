const express = require("express");
const { connect } = require("./db");
const commentsController = require("./controller/commentController");
const bodyParseer = require("body-parser");

const app = express();
app.use(bodyParseer.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.method);
  res.send("API main page");
});

app.get("/comments", commentsController.all);
app.post("/comment", commentsController.create);
app.put("/comment/:id", commentsController.update);
app.delete("/comment/:id", commentsController.delete);

const startServer = async () => {
  await connect(
    "mongodb+srv://admin:commentPass@commentdb.j9fjmtz.mongodb.net/?retryWrites=true&w=majority"
  );

  app.listen(3030, () => {
    console.log("this API is running on http://localhost:3030");
  });
};
startServer();
