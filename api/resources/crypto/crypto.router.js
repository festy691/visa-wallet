const express = require('express');
const cryptoController = require('./crypto.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('../user/auth');

const cryptoRouter = express.Router();
module.exports = cryptoRouter;

cryptoRouter.route('/')
    .post(protect, authorize('admin'), upload.single('image'),cryptoController.addCrypto)
    .get(cryptoController.getAllCrypto);

cryptoRouter.route('/:id')
    .put(protect, authorize('admin'), upload.single('image'), cryptoController.updateCrypto)
    .get(cryptoController.getOneCrypto)
    .delete(protect, authorize('admin'), cryptoController.deleteCrypto);

cryptoRouter.route('/paginate/images')
    .get(cryptoController.findAllPaginate);