const express = require('express');
const userController = require('./user.controller');
const upload = require('../../../config/multer');
const { protect, authorize } = require('./auth');

const userRouter = express.Router();
module.exports = userRouter;

userRouter.route('/')
    .post(upload.single('image'),userController.createUser)
    .get(protect, authorize('admin'), userController.getAllUsers);

userRouter.route('/:id')
    .put(protect, upload.single('image'),userController.updateUser)
    .get(protect,userController.getSingleUser)
    .delete(protect,userController.deleteUser);

userRouter.route('/login').post(userController.loginUser);

userRouter.route('/logout').post(protect,userController.logoutUser);

userRouter.route('/updatepassword/:id').put(protect,userController.updatePassword);

userRouter.route('/updatepics/:id').put(protect,userController.updateProfilePics);

userRouter.route('/forgotpassword').post(upload.single('image'),userController.forgotPassword);

userRouter.route('/resetpassword/:resettoken').put(userController.resetPassword);

userRouter.route('/me').get(protect,userController.getMe);

userRouter.route('/activate/:id').get(userController.verifyUserToken);

userRouter.route('/paginate/all').get(userController.findAllUsersPaginate);