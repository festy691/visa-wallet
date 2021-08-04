const express = require('express');
const imageController = require('./image.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const imageRouter = express.Router();
module.exports = imageRouter;

imageRouter.route('/')
    .post(protect, upload.single('image'),imageController.createImage)
    .get(imageController.getAllImages);

imageRouter.route('/:id')
    .put(protect, upload.single('image'), imageController.updateImage)
    .get(protect, imageController.getOneImage)
    .delete(protect, imageController.deleteImage);

imageRouter.route('/paginate/images')
    .get(protect, imageController.findAllPaginate);