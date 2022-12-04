import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { JsonPlaceholderApi } from "./src/JsonPlaceholderApi.js";
import { CommentDataLoader, UserDataLoader } from "./src/DataLoaders.js";

const typeDefs = `#graphql
type Query {
    posts: [Post]
}
type Post {
    id: ID!
    user: User
    title: String
    body: String
    comments: [Comment]
}
type User {
    id: ID!
    name: String
    email: String
}
type Comment {
    id: ID!
    postId: ID!
    email: String
    body: String
}
type Mutation {
    updatePost(
        id: ID!
        title: String!
        body: String!
        userId: ID!
    ): Post
}
`;

const resolvers = {
  Query: {
    posts: (_, {}, { dataSources }) => {
      return dataSources.jsonPlaceHolderApi.getPlaceholderPosts();
    },
  },
  Post: {
    user: async (parent, args, context) => {
      return await context.dataloaders.userDataloader.user.load(parent.userId);
    },
    comments: async (parent, args, context) => {
      return await context.dataloaders.commentDataloader.comment.load(
        parent.id
      );
    },
  },
  Mutation: {
    updatePost: async (parent, args, context) => {
      return await context.dataSources.jsonPlaceHolderApi.updatePost(args);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
  context: async () => {
    return {
      dataSources: {
        jsonPlaceHolderApi: new JsonPlaceholderApi(),
      },
      dataloaders: {
        userDataloader: new UserDataLoader(),
        commentDataloader: new CommentDataLoader(),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
