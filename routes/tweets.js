var router = require('express').Router()
var Twitter = require('twitter')
var tweets = []

var twitterAccount = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

router.use((req, res, next) => {
  res.header('access-control-allow-origin', '*')
  res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.post("/", (req, res) => {
  let tweets = []

  twitterAccount.get('search/tweets', {count: 100, q: '#ign', lang: 'en', exclude: "retweets"})
  .then((tweet) => {
    let tweetLength = tweet.statuses.tweetLength

    for (let x = 0; x < tweetLength; x++) {
      tweets.push({tweet: tweet.statuses[x].text})
    }
    res.send(tweets)
  })
  .catch((err) => {
    console.log(err)
    throw error
  })
})

module.exports = router