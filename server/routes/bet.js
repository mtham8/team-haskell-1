var express = require('express')
var router = express.Router()
var Auth = require('../helpers/auth')
var User = require('../helpers/user')
var Bets = require('../helpers/betHelpers')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.use(Auth.ifAuthorized)

router.get('/getAllPoints', function (req, res) {
  Bets.getAllPoints()
    .then(function (data) {
      res.json({
        success: true,
        data: data
      })
    })
})

router.get('/fetchBets', function (req, res) {
  console.log('this is fetchBets req.body: ', req.query.username)
  User.findUser(req.query.username)
    .then(function (id) {
      var user = id[0].id
      Bets.fetchBets(user)
        .then(function (data) {
          console.log('fetch user bets: ', data)
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.post('/betForm', function (req, res) {
  console.log('Betting form post', req.query.username)
  User.findUser(req.query.username)
    .then(function (id) {
      console.log('id', id)
      Bets.addBet(req.body.bettor_id, id[0].id, req.body.goals_id)
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.delete('/betDelete', function (req, res) {
  console.log('req.query', req.query)
  Bets.deleteBet(req.query.id)
    .then(function (data) {
      res.json({
        success: true,
        data: data
      })
    })
})

module.exports = router
