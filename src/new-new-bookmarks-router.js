const express = require('express');
const logger = require('./logger');
const uuid = require('uuid/v4');
const {bookmarks} = require('./STORE');
const bodyParser = express.json();
const bookmarksRouter = express.Router();
const {isWebUri} = require('valid-url');
const bookmarks_service = require('./bookmarks_service');
bookmarksRouter
  .route('/bookmarks')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    bookmarks_service.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req,res) => {
    const { title, rating, url, description='' } = req.body;
        
    if (!title || !rating || !url) {
      logger.error('Title, rating, and url are required');
      return res
        .status(400)
        .send('Invalid Data');
    }
      
    const ratingNum = parseFloat(rating);
    if (typeof ratingNum !== 'number' && (ratingNum >0 && ratingNum <= 5)) {
      return res
        .status(400)
        .send('rating must be a number between 1 and 5');
    }

    if (!isWebUri(url)) {
      logger.error(`Invalid url ${url}`);
      return res
        .status(400)
        .send('Not valid URL');
    }
    const id = uuid();
    const bookmark = {
      id,
      title,
      rating,
      url,
      description
    };
    bookmarks.push(bookmark);
    logger.info(`Bookmark with ${id} created`);
      
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
      
  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req,res, next) => {
    const { id } = req.params;
    bookmarks_service.getBookmarkById(req.app.get('db'), id)
      .then(bookmark => {
        if (!bookmark) {
          logger.error(`Bookmark with id ${id} not found`);
          return res
            .status(404)
            .send('Bookmark not found');
        }
        res.json(bookmark);
      })
      .catch(next);
  })

  .delete((req,res) => {
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
    res
      .status(204)
      .end();
  });
  
module.exports = bookmarksRouter;