const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")

        return userData;
      }
      throw new AuthenticationError("Not logged in - from resolvers");
    },
    // get all users
    users: async () => {
      return User.find().select("-__v -password");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
    },
    // get saved books
    savedBooks: async () => {
      return User.find();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!User) {
        throw new AuthenticationError(
          "Incorrect credentials - coming from resolvers"
        );
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError(
          "Incorrect credentials - coming from resolvers"
        );
      }

      const token = signToken(user);
      console.log(token, user);
      return { token, user };
    },
    addBook: async (
      parent,
      { bookId, title, authors, description, image },
      context
    ) => {
      console.log(context.user);
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              savedBooks: { bookId, title, authors, description, image },
            },
          },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError(
        "You need to be logged in! - from addBook resolvers"
      );
    },
  },
};

module.exports = resolvers;
