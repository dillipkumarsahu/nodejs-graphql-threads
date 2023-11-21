import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Thread } from "./thread";

const createApolloGraphqlServer = async () => {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs},
      ${Thread.typeDefs}
      type Query {
          ${User.queries},
          ${Thread.queries}
      }
      type Mutation {
          ${User.mutations},
          ${Thread.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Thread.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Thread.resolvers.mutations,
      },
    },
  });

  await gqlServer.start();

  return gqlServer;
};

export default createApolloGraphqlServer;
