const express = require('express');
const logger = require('./logger');
const uuid = require('uuid/v4');
const {bookmarks} = require('./STORE');


const bookmarksRouter = express.Router();



bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post((req,res) => {
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
