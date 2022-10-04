import { ApolloServer } from "apollo-server";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { schema } from "./schema"; 

export const server = new ApolloServer({
  schema,
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const PORT = process.env.PORT || 3500;

server.listen({port: PORT}).then(({ url }) => {console.log(`Server ready at ${url}`)})
