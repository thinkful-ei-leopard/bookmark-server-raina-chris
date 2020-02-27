const uuid = require('uuid/v4');

const bookmarks = [
  {
    id: uuid(),
    title: 'bookmarks',
    url: 'https://wwww.google.com',
    rating: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis mauris at faucibus ullamcorper. Curabitur lorem magna, commodo ut ante convallis, gravida sodales massa.'
  },
  {
    id: uuid(),
    title: 'thinkful',
    url: 'https://wwww.thinkful.com',
    rating: 5,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis mauris at faucibus ullamcorper. Curabitur lorem magna, commodo ut ante convallis, gravida sodales massa.'
  }
];

module.exports = { bookmarks };