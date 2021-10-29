const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Post {
    id: ID!
    title: String!
    content: String!
    date: String!
    likes: Int!
    dislikes: Int!
    banner: String!
    comments: [Comment!]!
    slug: String!
    author: Author!
}
type Comment {
    id: ID!
    name: String!
    comment: String!
    replies: [Comment!]!
}
type Author {
    id: ID!
    name: String!
    email: String!
    date: String
    about: String!
    avatar: String!
}
input PostInput {
    title: String!
    content: String!
    date: String
    banner: String!
    author: String!
}
input PostUpdate {
    title: String
    content: String
    date: String
    banner: String
    likes: Int
    dislikes: Int
}
input CommentInput {
    name: String!
    comment: String!
    blog: ID!
}
input CommentReply {
    name: String!
    comment: String!
    parentComment: ID!
}
input AuthorInput {
    name: String!
    email: String!
    date: String
    about: String!
    avatar: String
}

type myQuery {
    posts: [Post!]!
    post(id: ID, slug: String): Post
    authors: [Author!]!
    author(id: ID!): Author
}
type myMutation {
    createPost(input: PostInput): Post!
    updatePost(id: ID!, input: PostUpdate!): Post!
    deletePost(id: ID!): Post!
    createComment(input: CommentInput): Comment!
    replyComment(input: CommentReply): Comment!
    deleteComment(id: ID!): Comment!
    createAuthor(input: AuthorInput): Author!
    likeComment(id: ID!): Comment!
    dislikeComment(id: ID!): Comment!
}
schema {
    query: myQuery
    mutation: myMutation
}
`);