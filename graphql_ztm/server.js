const path = require("path")
const express = require("express")
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const { loadFileSync, loadFilesSync } = require("@graphql-tools/load-files")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"))
const resolversArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"))
console.log("resolversArray: ", resolversArray)

const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
})


const app = express()

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(3000, () => {
    console.log("The server is runnning on port 3000 ....")
})