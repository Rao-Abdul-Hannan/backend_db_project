const express = require('express')
const v1Router = require('./v1Routes/v1Router')
const apiRouter = express.Router()

apiRouter.use(`/v1`, v1Router)

module.exports = apiRouter