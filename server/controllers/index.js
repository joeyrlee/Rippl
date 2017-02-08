var twitterUtil = require('../utility/util-twtr.js');
var havenUtil = require('../utility/util-haven.js');
var Promise = require('bluebird');
var $ = require('jquery');
var {Score} = require('../db/index.js');
var {User} = require('../db/index.js');


var getTweetsAsync = Promise.promisify(twitterUtil.getTweets, {context: twitterUtil, multiArgs: true});
var getSentimentAsync = Promise.promisify(havenUtil.getSentiment, {context: havenUtil});

module.exports = {
  getAnalysis: function(req, res, next) {
    console.log('getAnalysis CALLED');

    // Using hardcoded twitter handle for testing purposes, default currently pulls 5 most recent tweets
    var twitterHandle = req.query.handle //|| 'defaultTwitterHandle';
    var location = req.query.location //|| 'defaultLocation';
    var topic = req.query.topic //|| 'defaultTopic';

    console.log('twitterHandle ===>', twitterHandle);
    console.log('location ===>', location);
    console.log('topic ===>', topic);

    var currentUser = req.params.user || 'RipplMaster';
    var globaldata, globaltweetData, globalsentiment, globaluser;

    getTweetsAsync(twitterHandle)
    .spread((data, response) => {
      globaldata = data;
      globaltweetData = twitterUtil.getTweetString(globaldata);

      // Need to look into handling haven asynchronously
      return getSentimentAsync(twitterHandle, globaltweetData.string);
    })
    .then((sentiment) => {
      globalsentiment = sentiment;
      console.log('response ==>', sentiment);
      return User.findOne({username: currentUser});
    })
    .then(function(user) {
      console.log('CREATING SCORE');
      console.log(user, '---------------------');
      // Work here
      return Score.create({
        twitterHandle: twitterHandle,
        location: location,
        topic: topic,
        numTweets: globaldata.length,
        tweetText: globaltweetData.string,
        sentimentScore: globalsentiment,
        retweetCount: globaltweetData.retweetCount,
        favoriteCount: globaltweetData.favoriteCount
      })
        .then((newScore) => newScore.setUser(user.id)
        .then((newScore) => newScore));
    })
    .then((newScore) => {
      console.log('New score created!');
      return res.status(200).json(newScore);
    })
    .catch((err) => {
      console.error('Analysis error ', err);
      return res.status(404).end();
    });
  },

  getRequestToken: function(req, res, next) {
    twitterUtil.getRequestToken(req, res);
  },

  getAccessToken: function(req, res, next) {
    // Receives callback that contains oAuth verifier
    // Pull verifier from query parameters
    // Send oAuth verifier through utility function and user promises to verify consumer keys
    let oAuthVerifier = req.query.oauth_verifier;
    twitterUtil.getAccessToken(req, res, oAuthVerifier);
  },

  getUserScores: function(req, res, next) {
    console.log('Username param: ' + req.params.username);
    let username = req.params.username || 'RipplMaster';
    console.log(username);
    User.find({where: { username: username }})
    .then(function(user) {
      console.log('USER :', user);
      return Score.findAll({UserId: user.id});
    })
    .then(function(scores) {
      res.status(200).json(scores);
    })
    .catch(function(err) {
      console.error('Error fetching user scores', err);
      res.status(404).end();
    });
  },

  createTestUser: function(req, res, next) {
    User.findOrCreate({where: {username: 'RipplMaster'}, defaults: {password: ''}})
    .then((user) => {
      console.log('testUser created');
      res.status(200).end();
    })
    .catch((err) => {
      console.log('RipplMaster creation error');
      res.status(404).end();
    });
  }

};