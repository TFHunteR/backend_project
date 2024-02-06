require('./env')
const express = require('express')
const { createYoga } = require('graphql-yoga')
const { useAPQ } = require('@graphql-yoga/plugin-apq')
const session = require('express-session')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const _ = require('lodash')
const cookieParser = require('cookie-parser')
const RedisStore = require('connect-redis')(session)
const RedisClient = require('./src/utility/redis-client')

const schema = require('./src/schema')
const setContext = require('./src/setContext')
const localStrategy = require('./src/middlewares/localStrategy')
const SESSION_SECRET = process.env.SESSION_SECRET || null
const CORS_ORIGIN = JSON.parse(process.env.CORS_ORIGIN) || null
const PORT = process.env.PORT || 4001
const EXPIRE_COOKIE = 60000 * 60 * 24 // 1 day expiration
const SESSION_COOKIE_DOMAIN = process.env.SESSION_COOKIE_DOMAIN
const usePassport = require('./src/plugins/passport')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/', express.static('assets'))

var corsOptions = {
  methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  optionsSuccessStatus: 200,
  origin: CORS_ORIGIN,
  credentials: true //required true to use by SSO
}

app.use(cookieParser())
app.use(cors(corsOptions))

// disable trust proxy in localhost to save session
app.set('trust proxy', false) // trust first proxy
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false, // don't save session if unmodified
    saveUninitialized: true,
    // saveUninitialized: false, // don't create session until something stored
    cookie: {
      secure: false, // if true only transmit cookie over https
      domain: SESSION_COOKIE_DOMAIN,
      maxAge: EXPIRE_COOKIE //disabled, let the Frontend do the autologout
    },
    store: new RedisStore({ client: RedisClient, prefix: 'sms:' })
  })
)

// Init passport authentication
app.use(passport.initialize())
app.use(passport.authenticate('session'))

passport.use(localStrategy)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      roleCode: user.roleCode
    })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})

app.get('/', function (req, res) {
  const { isAuthenticated } = req

  console.log({ isAuthenticated: isAuthenticated() })
  res.status(200).send('Hello World')
})

app.post('/login', passport.authenticate('local'), (req, res, next) => {
  const user = _.has(req, 'user') ? req.user : null
  console.log({ user, auth: req.isAuthenticated() })
  res.status(200).send({ ...user })
})

app.post('/logout', async (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err)
  })
  res.clearCookie('connect.sid')
  res.send({ isAuth: req.isAuthenticated(), user: req.user })
})

app.get('/isAuthenticated', (req, res, next) => {
  console.log({ auth: req.isAuthenticated() })
  res.status(200).send({ authenticated: req.isAuthenticated(), user: req.user })
})

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  healthCheckEndpoint: '/live',
  plugins: [
    useAPQ()
    // usePassport()
  ],
  context: setContext
})

app.use(yoga.graphqlEndpoint, yoga)

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  )
})
