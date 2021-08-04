const express = require('express');
const userRouter  = require('./resources/user');
const imageRouter  = require('./resources/image');
const authRouter  = require('./resources/auth');
const cryptoRouter  = require('./resources/crypto');
const reportRouter  = require('./resources/report');
const orderRouter  = require('./resources/order');

const restRouter = express.Router();

module.exports =  restRouter;

restRouter.use('/users', userRouter);
restRouter.use('/authenticate', authRouter);
restRouter.use('/images', imageRouter);
restRouter.use('/cryptos', cryptoRouter);
restRouter.use('/reports', reportRouter);
restRouter.use('/orders', orderRouter);