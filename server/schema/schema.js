//schema for our data. object types, relations between them..
// schema file has 3 responsibilities.1) Types, 2)Relationships between types,3)Defining root queries
//Root Queries are how we describe that a user can initially jump into the graph and grab data.

const graphql = require("graphql");
// const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError,
} = graphql;

// // dummy data
// var books = [
//   { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
//   { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
//   { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
// ];

// var authors = [
//   { name: "Patrick Rothfuss", age: 44, id: "1" },
//   { name: "Brandon Sanderson", age: 42, id: "2" },
//   { name: "Terry Pratchett", age: 66, id: "3" },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _find(authors, parent.authorId);
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, {authorId:parent.id })
        // return books.filter((book) => book.authorId === parent.id);
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType, //yukarida olusturdugumuz type
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // return _.find(author, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({}); //returns all match
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parents, args) {
        // return authors;
        return Author.find({});
      },
    },
  },
});

//mutations likes post root query like get request

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        let newAuthor = new Author({
          name: args.name,
          age: args.age,
        });

        try {
          const savedAuthor = await newAuthor.save();
          return savedAuthor;
        } catch (err) {
          const error = new GraphQLError(err); //you need to import GraphQLError like a GraphQLString type
          return error;
        }
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        // let newBook = new Book({
        //   name: args.name,
        //   genre: args.age,
        //   authorId: args.authorId,
        //es6:

        // });

        try {
          const savedBook = await Book(args).save();
          return savedBook;
        } catch (err) {
          const error = new GraphQLError(err); //you need to import GraphQLError like a GraphQLString type
          return error;
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
