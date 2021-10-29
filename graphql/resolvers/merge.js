const Post = require('../../models/posts');
const Author = require('../../models/author');
const { dateToString } = require('../../helpers/date');

const posts = async postIds => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    return posts.map(post => {
      return transformPost(post);
    });
  } catch (err) {
    throw err;
  }
};

const singlePost = async postId => {
  try {
    const post = await Post.findById(postId);
    return transformEvent(post);
  } catch (err) {
    throw err;
  }
};

const author = async userId => {
  try {
    const author = await Author.findById(authorId);
    return {
      ...author._doc,
      _id: author.id,
      createdPosts: posts.bind(this, author._doc.createdPosts)
    };
  } catch (err) {
    throw err;
  }
};

const transformPost = post => {
  return {
    ...post._doc,
    _id: post.id,
    date: dateToString(post._doc.date),
    author: author.bind(this, post.creator)
  };
};

const transformPosting =  posting => {
  return {
    ...posting._doc,
    _id: posting.id,
    author: author.bind(this, posting._doc.author),
    post: singlePost.bind(this, posting._doc.post),
    createdAt: dateToString(posting._doc.createdAt),
    updatedAt: dateToString(posting._doc.updatedAt)
  };
};

exports.transformPost = transformPost;
exports.transformPosting = transformPosting;
