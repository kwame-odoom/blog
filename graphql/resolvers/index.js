const postsResolver = require('./posts');
const postingResolver = require('./posting');

const rootResolver = {
  ...postsResolver,
  ...postingResolver
};

module.exports = rootResolver;