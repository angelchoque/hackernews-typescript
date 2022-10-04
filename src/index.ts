import { ApolloServer } from "apollo-server";
import { context } from "./context";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import { schema } from "./schema"; 

export const server = new ApolloServer({
  schema,
  // plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: context // It lets resolvers communicate with each other
});
// the context object will be initialized with an instance of PrismaClient (as prisma)
// when ApolloServer is instantiated. So you’ll now be able to access Prisma with
// context.prisma in all of your resolvers.

const PORT = process.env.PORT || 3500;

server.listen({port: PORT}).then(({ url }) => {console.log(`Server ready at ${url}`)})
