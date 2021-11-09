import config from "./../config/config";
import app from "./express";
import mongoose from "mongoose";
import bidding from "./controllers/bidding.controller";

// Connection URL
const uri =
  "mongodb+srv://matt:bJFguwc6ulFUU4aG@mern-social.dt8ir.mongodb.net/marketplace?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => console.log(err));
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${uri}`);
});

const server = app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

bidding(server);
