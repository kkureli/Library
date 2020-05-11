const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect(
  "mongodb+srv://kkureli:JSHuH49zZZ0dbYeU@cluster0-jtrbl.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

//express'in graphql'i anlayabilmesi icin graphQLHTTP'yi kullanabilmek icin bir route uzerinde middleware kullaniyoruz.
//This route will be like an endpoints to interact with our graphQL data
// we send all graphql queries to

// /graphql'e gidildiginde graphqlHTTP kullaniliyor request icin.
app.use(
  "/graphql",
  graphqlHTTP({
    //that schema is gonna tell express graphql how our graph will look.
    schema,
    graphiql: true, //graphiql tool to test queries
  })
);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
