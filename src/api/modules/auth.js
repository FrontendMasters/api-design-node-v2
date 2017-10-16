import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
const jwtSecret = 'blueRhinoJumps'

const checkToken = expressJwt({ secret: jwtSecret })
const disableAuth = false

export const signin = (req, res, next) => {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  const token = signToken(req.user.id)
  res.json({token: token})
}

export const decodeToken = () => (req, res, next) => {
  if (disableAuth) {
    return next()
  }
  // make it optional to place token on query string
  // if it is, place it on the headers where it should be
  // so checkToken can see it. See follow the 'Bearer 034930493' format
  // so checkToken can see it and decode it
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token
  }

  // this will call next if token is valid
  // and send error if its not. It will attached
  // the decoded token to req.user
  checkToken(req, res, next)
}

export const getFreshUser = () => (req, res, next) => {
  return User.findById(req.user.id)
    .then(function(user) {
      if (!user) {
        // if no user is found it was not
        // it was a valid JWT but didn't decode
        // to a real user in our DB. Either the user was deleted
        // since the client got the JWT, or
        // it was a JWT from some other source
        res.status(401).send('Unauthorized')
      } else {
        // update req.user with fresh user from
        // stale token data
        req.user = user
        next()
      }
    })
    .catch(error => next(error))
}

export const verifyUser = () => (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  // if no username or password then send
  if (!username || !password) {
    res.status(400).send('You need a username and password')
    return
  }

  // look user up in the DB so we can check
  // if the passwords match for the username
  User.findOne({username: username})
    .then(function(user) {
      if (!user) {
        res.status(401).send('No user with the given username')
      } else {
        // checking the passowords here
        if (!user.authenticate(password)) {
          res.status(401).send('Wrong password')
        } else {
          // if everything is good,
          // then attach to req.user
          // and call next so the controller
          // can sign a token from the req.user._id
          req.user = user;
          next()
        }
      }
    })
    .catch(error => next(err))
}

export const signToken = (id) => jwt.sign(
  {id},
  jwtSecret,
  {expiresIn: '30d'}
)

export const protect = [decodeToken(), getFreshUser()]
