import { objectType, extendType, nonNull, stringArg, intArg } from "nexus";
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

// Apollo Server is capable of detecting and automatically
// resolving any Promise object that is returned from resolver functions.

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
        return context.prisma.link.findMany(); // Promise
      }
    })
  },
})

// export const LinkQueryById = extendType({
//   type: "Query",
//   definition(t) {
//     t.field("postContent", {
//       type: "Link",
//       args: {
//         id: nonNull(intArg())
//       },
//       resolve(parent, args, context) {
//         const { id } = args
//         const data: NexusGenObjects["Link"] | undefined = links.find(i => i.id === id)
//         return data ? data : null
//       }
//     })
//   },
// })

export const LinkMutation = extendType({
  type: "Mutation", // extending the Mutation type to add a new root field
  definition(t) {
    t.nonNull.field("post", { // The name of the mutation is defined as post and it returns a (non nullable) link object.
      type: "Link",
      args: { // arguments nonNull
        description: nonNull(stringArg()),
        url: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { description, url } = args; // arguments created
        const newLink = context.prisma.link.create({
          data: {
            description: description,
            url: url,
          }
        })
        return newLink;
      }
    })
  },
})

// export const UpdateLinkMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nonNull.field("updateLink", {
//       type: "Link",
//       args: {
//         id: nonNull(intArg()),
//         description: nonNull(stringArg()),
//         url: nonNull(stringArg()),
//       },
//       resolve(parent, args, context) {
//         const { id, description, url } = args
//         const index = links.findIndex(i => i.id === id)
//         links[index] = {
//           id: id,
//           description: description,
//           url: url
//         }
//         return links[index]
//       }
//     })
//   },
// })

// export const DeleteLinkMutation = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.nullable.int("deleteLink", {
//       args: {
//         id: nonNull(intArg())
//       },
//       resolve(parent, args, context) {
//         const { id } = args
//         const index = links.findIndex(i => i.id === id)
//         links.splice(index, 1)
//         return id
//       }
//     })
//   }
// })