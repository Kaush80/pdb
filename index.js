import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./data/schema";
import resolvers from "./data/resolvers";
const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL: server started");
});

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, () =>
  console.log("running server on port localhost:8080/graphql")
);
