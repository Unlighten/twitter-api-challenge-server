var router = require('express').Router()
var Twitter = require('twitter')
var tweets = []
var keys = require('./config')
var twitterAccount = new Twitter(keys.configKeys)


router.use((req, res, next) => {
  res.header('access-control-allow-origin', '*')
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
})

router.post("/", (req,res) => {
  let tweets = []

  twitterAccount.get('search/tweets', {count: 100, q: '#ign', lang: 'en', exclude: "retweets"})
  .then((tweet) => {
    let length = tweet.statuses.length

    for (var x = 0; x < length; x++) {
      tweets.push({tweet: tweet.statuses[x].text})
    }
    res.send(tweets)
  })
  .catch((err) => {
    console.log(err)
    throw error
  });
})

module.exports = router
