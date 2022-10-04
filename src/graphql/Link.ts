import { objectType, extendType } from "nexus";
import { NexusGenObjects } from "../../nexus-typegen";

// objectType is used to create a new type in your GraphQL schema
export const Link = objectType({
  name: "Link", // name type
  definition(t) { // Inside the definition, you can add different fields that get added to the type
    t.nonNull.int("id"); // This adds a field named id of type Int
    t.nonNull.string("description");
    t.nonNull.string("url")
  }
})

let links: NexusGenObjects["Link"][] = [ // store runtime
  {
    id: 1,
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: 2,
    url: "graphql.org",
    description: "GraphQL official website",
  },
];

export const LinkQuery = extendType({ // extending the Query root type and adding a new root field to it called feed.
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", { // define the return type of the feed query as a not nullable array of link type objects (In the SDL the return type will look like this: [Link!]!)
      type: "Link",
      // resolve is the name of the resolver function of the feed query. A resolver is the implementation for a GraphQL field. Every field on each 
      // type (including the root types) has a resolver function which is executed to get the return value when fetching that type. For now, 
      // our resolver implementation is very simple, it just returns the links array. The resolve function has four arguments, parent, args, 
      // context and info. We will get to these later.
      resolve(parents, args, context, info) {
        return links;
      }
    })
  },
})