const uuid = require('uuid/v4');

const bookmarks = [
  {
    id: uuid(),
    title: 'bookmarks',
    url: 'https://wwww.google.com',
    rating: 5,
    description: 'asdafasfasdfaf'
  },
  {
    id: uuid(),
    title: 'thinkful',
    url: 'https://wwww.thinkful.com',
    rating: 5,
    description: 'asdafasfasdfaf'
  }
];

module.exports = { bookmarks };