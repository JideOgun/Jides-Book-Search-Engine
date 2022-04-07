const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        // get all users
        users: async() => {
            return User.find();
        },
        books: async() => {
            return Book.find();
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log("user")
            const user = await User.create(args)
            
            const token = signToken(user)
            return { token, user }
        },
        login: async = () => {

        }
    }
}


module.exports = resolvers;