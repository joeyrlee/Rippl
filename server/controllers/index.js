var twitterUtil = require('../utility/util-twtr.js');
var havenUtil = require('../utility/util-haven.js');
var Promise = require('bluebird');
var {Score} = require('../db/index.js');
var {User} = require('../db/index.js');


var getTweetsAsync = Promise.promisify(twitterUtil.getTweets, {context: twitterUtil, multiArgs: true});
//KG Added next:
var getTweetsByTopicAsync = Promise.promisify(twitterUtil.getTweetsByTopic, {context: twitterUtil, multiArgs: true});
var getSentimentAsync = Promise.promisify(havenUtil.getSentiment, {context: havenUtil});

module.exports = {
  getHandleAnalysis: function(req, res, next) {
    console.log('getHandleAnalysis CALLED');

    // reads twitterHandle off query string
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
      return User.findOne({where: {username: currentUser}});
    })
    .then(function(user) {
      console.log('CREATING SCORE');
      // Work here
      return Score.create({
        twitterHandle: twitterHandle,
        location: location, //should be undefined if only testing handle
        topic: topic, //should be undefined if only testing handle
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
      console.error('Analysis error ');
      return res.status(404).end();
    });
  },


  getTopicAnalysis: function(req, res, next) {
    console.log('getTopicAnalysis CALLED');
    console.log(req.query);

    // reads topic off query string
    var location = req.query.location
    var topic = req.query.topic
    var twitterHandle = req.query.location
    var clientUserName = req.query.clientUserName

    console.log('topic ===>', topic);
    console.log('location ===>', location);
    console.log('---------------------------------------------');
    console.log('clientUserName ===>', clientUserName);

    getTweetsByTopicAsync(topic, location) //(...args)
    .spread((data, response) => {
      console.log('inside .spread of getTweetsByTopicAsync in controller');
      globaldata = data;
      globalTweetString = twitterUtil.getTweetStringForTopic(globaldata);
      // console.log('tweetString ==> ', globalTweetString)
      // globaltweetData = twitterUtil.getTweetString(globaldata);

      console.log('finished getTweetString')
      // Need to look into handling haven asynchronously
      return getSentimentAsync(twitterHandle, globalTweetString);
    })
    .then((sentiment) => {
      globalsentiment = sentiment;
      return User.findOne({where: {username: clientUserName}});
    })
    .then(function(user) {
      return Score.create({
        topic: topic,
        location: location,
        tweetText: globalTweetString,
        sentimentScore: globalsentiment,
      })
        .then((newScore) => newScore.setUser(user.id)
        .then((newScore) => newScore));
    })
    .then((newScore) => {
      console.log('New score created!');
      return res.status(200).json(newScore);
    })
    .catch((err) => {
      console.log('Analysis error ');
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
    // console.log('Username param: ' + req.params.username);
    let username = req.params.username || 'RipplMaster';
    User.findOrCreate({where: { username: username }})
    .then(function(user) {
      var userID = user[0].dataValues.id;
      return Score.findAll({where: {UserId: userID}});
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
