require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const logger = require('./logger');
const app = express();
const uuid = require('uuid/v4');
const errorHandler = require('./error-handler');
const { bookmarks } = require('./STORE');
const bookmarkRouter = require('./bookmarks-router')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  // move to the next middleware
  next();
});






app.get('/bookmarks/:id', (req,res) => {
  const { id } = req.params;

  const index = bookmarks.findIndex(bookmark => bookmark.id === id);
  
  if (index === -1) {
    logger.error(`Bookmark with id ${id} not found`);
    return res
      .status(404)
      .send('Bookmark not found');
  }

  res.json(bookmarks[index]);
})



app.delete('/bookmarks/:id', (req,res) => {
  const { id } = req.params;

  const index = bookmarks.findIndex(bookmark => bookmark.id === id);
  
  if (index === -1) {
    logger.error(`Bookmark with id ${id} not found`);
    return res
      .status(404)
      .send('Bookmark not found');
  }

  bookmarks.splice(index, 1);

  logger.info(`Bookmark with id ${id} deleted`);
  res.status(204).end();
});

app.use(errorHandler);


module.exports = app;