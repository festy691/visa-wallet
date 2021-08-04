const express = require('express');
const orderController = require('./order.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const orderRouter = express.Router();
module.exports = orderRouter;

orderRouter.route('/')
    .post(protect, upload.single('image'),orderController.placeOrder)
    .get(protect, orderController.getAllOrder);

orderRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), orderController.updateOrder)
    .get(protect, orderController.getOneOrder)
    .delete(protect, authorize('admin'), orderController.deleteOrder);

orderRouter.route('/paginate/images')
    .get(protect, orderController.findAllPaginate);