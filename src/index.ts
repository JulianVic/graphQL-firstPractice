import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const books: any = [
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

    input BookInput{
      title: String
      author: String
      stock: Int
    }

    type Mutation {
        addBook(book: BookInput): Book
        deleteBook(id: ID!): Book
        updateBook(id: ID!, title: String, stock: Int): Book
    }
`;

const resolvers = {
  Query: {
    books: () => books,
    book(root: any, args: { id: string }) {
        return books.find((book: { id: number; }) => book.id === parseInt(args.id));
    },
    authors: () => authors,
    author(root: any, args: { id: string }) {
        return authors.find((author) => author.id === parseInt(args.id));
    },

  },
  Mutation: {
    addBook: (root: any, args: { book: any }) => {
        const newBook = {
            id: books.length + 1,
            title: args.book.title,
            author: args.book.author,
            stock: args.book.stock,
        };
        books.push(newBook);
        return newBook;
    },
    deleteBook: (root: any, args: { id: string }) => {
        const bookIndex = books.findIndex((book: { id: number; }) => book.id === parseInt(args.id));
        const deletedBook = books[bookIndex];
        books.splice(bookIndex, 1);
        return deletedBook;
    },
    updateBook(root: any, args: { id: string, title: string, stock: number}) {
      const bookIndex = books.findIndex((book: { id: number; }) => book.id === parseInt(args.id));
      const updatedBook = {
        ...books[bookIndex],
        title: args.title,
        stock: args.stock,
      };
      books[bookIndex] = updatedBook;
      return updatedBook;
    },


  },

};

const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  const { url } = await startStandaloneServer
  (server, {
    listen: { port: 4000 },
  });
  console.log(`Server ready at ${url}`);
})();
