import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const books = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
    stock: 2,
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
    stock: 13,
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "Paul Auster",
    stock: 23,
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    stock: 5,
  },
];

const authors = [
    {
        id: 1,
        name: "Kate Chopin",
        age: 54,
    },
    {
        id: 2,
        name: "Paul Auster",
        age: 73,
    },
    {
        id: 3,
        name: "J.D. Salinger",
        age: 91,
    },
];


const typeDefs = `
    type Book {
        id: ID
        title: String
        author: String
        stock: Int
    }
    type Author {
        id: ID
        name: String
        age: Int
    }
    
    type Query {
        books: [Book]
        book(id: ID!): Book
        authors: [Author]
        author(id: ID!): Author
    }
`;

const resolvers = {
  Query: {
    books: () => books,
    book(root: any, args: { id: string }) {
        return books.find((book) => book.id === parseInt(args.id));
    },
    authors: () => authors,
    author(root: any, args: { id: string }) {
        return authors.find((author) => author.id === parseInt(args.id));
    },

  },
};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await 
  (server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
})();
