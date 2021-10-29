const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema} = require('graphql');
const mongoose = require('mongoose');

const app = express();

const posts = [];

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
      schema: buildSchema(`
      type Post{
          _id: ID!
          title:  String!
            author: String!
            body:   String!
            comments: String
            date: String
            hidden: Boolean
      }
      input PostInput{
        title:  String!
        author: String!
        body:   String!
        comments: String
        date: String
        hidden: Boolean
    }
      type myQuery{
          posts : [Post!]!
        }
      type myMutation{
          createPost(postInput: PostInput) :Post
        }
        schema{
            query: myQuery
            mutation: myMutation
        }
      `),
      rootValue: {
          posts: ()=>{
              return posts;
          },
          createPost: (args) => {
              const post ={
                _id:  Math.random().toString(), title: args.postInput.title,
                author: args.postInput.author,
                body:args.postInput.body,
                comments: args.postInput.comments,
                date: args.postInput.date,
                hidden: args.postInput.hidden,
              };
              posts.push(post);
              return post;
          }
      },
      graphiql: true
    })
);
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0jqgt.mongodb.net${process.env.MONGO_DB}?retryWrites=true&w=majority`) .then(() => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
